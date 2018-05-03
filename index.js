'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var propTypes = require('prop-types');
var reactDom = require('react-dom');
var regefGeometry = require('regef-geometry');

var REGEF_PROP_KEY = '@@superSecretPropForTransferingContextInAVeryAwkwardWay';

// Diagram participant types
var ROOT_TYPE = 'root';
var NODE_TYPE = 'node';
var PORT_TYPE = 'port';
var CONNECTION_TYPE = 'connection';

// Request types
var ADD = 'add';
var CREATE = 'create';
var MOVE = 'move';
var SELECT = 'select';
var DELETE = 'delete';
var START_CONNECTION = 'start-connection';
var END_CONNECTION = 'end-connection';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var RegefContext = React__default.createContext({
  id: null,
  engine: null
});

function withRegefContext(Wrapped) {
  function WithRegefContext(props) {
    return React__default.createElement(
      RegefContext.Consumer,
      null,
      function (regef) {
        return React__default.createElement(Wrapped, _extends({}, props, defineProperty({}, REGEF_PROP_KEY, regef)));
      }
    );
  }
  return WithRegefContext;
}

var EventManager = function () {
  function EventManager(engine) {
    classCallCheck(this, EventManager);

    this.engine = engine;
    this.hooked = false;
    // binding methods
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  createClass(EventManager, [{
    key: 'hookListeners',
    value: function hookListeners() {
      document.addEventListener('mousedown', this.onMouseDown);
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
      document.addEventListener('keydown', this.onKeyDown);
      document.addEventListener('keyup', this.onKeyUp);

      this.hooked = true;
    }
  }, {
    key: 'unhookListeners',
    value: function unhookListeners() {
      document.removeEventListener('mousedown', this.onMouseDown);
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
      document.removeEventListener('keydown', this.onKeyDown);
      document.removeEventListener('keyup', this.onKeyUp);

      this.hooked = false;
    }
  }, {
    key: 'onKeyUp',
    value: function onKeyUp(e) {
      this.engine.capabilities.forEach(function (capability) {
        return capability.onKeyUp(e);
      });
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      this.engine.capabilities.forEach(function (capability) {
        return capability.onKeyDown(e);
      });
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(e) {
      this.engine.capabilities.forEach(function (capability) {
        return capability.onMouseDown(e);
      });
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(e) {
      this.engine.capabilities.forEach(function (capability) {
        return capability.onMouseMove(e);
      });
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp(e) {
      this.engine.capabilities.forEach(function (capability) {
        return capability.onMouseUp(e);
      });
    }
  }]);
  return EventManager;
}();

var Toolkit = function () {
  function Toolkit(engine) {
    classCallCheck(this, Toolkit);

    this.engine = engine;
  }

  createClass(Toolkit, [{
    key: "forPart",
    value: function forPart(id) {
      var part = this.engine.part(id);
      if (part === null) {
        throw new Error("DiagramPart " + id + " hasn't been registered.");
      }
      return part ? part.toolkit : null;
    }
  }, {
    key: "forComponent",
    value: function forComponent(component) {
      var parts = this.engine.parts;
      for (var i = 0, length = parts.length; i < length; i += 1) {
        var part = parts[i];
        if (part.registry.has(component)) {
          return part;
        }
      }
      throw new Error("Component " + component + " is not registered in any DiagramParts.");
    }
  }]);
  return Toolkit;
}();

var DomHelper = function () {
  function DomHelper(engine) {
    classCallCheck(this, DomHelper);

    this.engine = engine;
  }

  createClass(DomHelper, [{
    key: "findPart",
    value: function findPart(dom) {
      var matcher = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return true;
      };

      var parts = this.engine.parts;
      for (var i = 0; i < parts.length; i += 1) {
        var part = parts[i];
        if (part.domHelper.partContains(dom)) {
          return matcher(part) ? part : null;
        }
      }
      return null;
    }
  }]);
  return DomHelper;
}();

var SELECTION_PROVIDER = Symbol('SELECTION_PROVIDER');
var CAPABILITIES = Symbol('CAPABILITIES');
var DOM_HELPER = Symbol('DOM_HELPER');
var TOOLKIT = Symbol('TOOLKIT');
var EVENT_MANAGER = Symbol('EVENT_MANAGER');
var EDIT_POLICIES = Symbol('EDIT_POLICIES');
var PARTS = Symbol('PARTS');

var Engine = function () {
  function Engine() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
      return {
        capabilities: [],
        editPolicies: [],
        selectionProvider: null
      };
    };
    classCallCheck(this, Engine);

    this[TOOLKIT] = new Toolkit(this);
    this[EVENT_MANAGER] = new EventManager(this);
    this[DOM_HELPER] = new DomHelper(this);
    this[PARTS] = new Map();

    var _config = config(this),
        capabilities = _config.capabilities,
        editPolicies = _config.editPolicies,
        selectionProvider = _config.selectionProvider;

    this[CAPABILITIES] = capabilities;
    this[EDIT_POLICIES] = editPolicies;
    this[SELECTION_PROVIDER] = selectionProvider;
  }

  createClass(Engine, [{
    key: '__partsMap',
    value: function __partsMap() {
      return this[PARTS];
    }
  }, {
    key: 'part',
    value: function part(id) {
      return this[PARTS].get(id);
    }
  }, {
    key: 'domHelper',
    get: function get$$1() {
      return this[DOM_HELPER];
    }
  }, {
    key: 'parts',
    get: function get$$1() {
      return Array.from(this[PARTS].values());
    }
  }, {
    key: 'eventManager',
    get: function get$$1() {
      return this[EVENT_MANAGER];
    }
  }, {
    key: 'toolkit',
    get: function get$$1() {
      return this[TOOLKIT];
    }
  }, {
    key: 'capabilities',
    get: function get$$1() {
      return this[CAPABILITIES];
    }
  }, {
    key: 'selectionProvider',
    get: function get$$1() {
      return this[SELECTION_PROVIDER];
    }
  }, {
    key: 'editPolicies',
    get: function get$$1() {
      return this[EDIT_POLICIES];
    }
  }]);
  return Engine;
}();

var DiagramPart = function (_PureComponent) {
  inherits(DiagramPart, _PureComponent);

  function DiagramPart() {
    classCallCheck(this, DiagramPart);
    return possibleConstructorReturn(this, (DiagramPart.__proto__ || Object.getPrototypeOf(DiagramPart)).apply(this, arguments));
  }

  createClass(DiagramPart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var engine = this.props.engine;

      if (!engine.eventManager.hooked) {
        engine.eventManager.hookListeners();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _props = this.props,
          id = _props.id,
          engine = _props.engine;

      var parts = engine.__partsMap();
      var part = parts.get(id);
      if (part && part.registry) {
        part.registry.setRoot(null);
      }
      parts.delete(id);
      if (parts.size === 0) {
        engine.eventManager.unhookListeners();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          id = _props2.id,
          engine = _props2.engine;

      return React__default.createElement(
        RegefContext.Provider,
        { value: { id: id, engine: engine } },
        React.Children.only(this.props.children)
      );
    }
  }]);
  return DiagramPart;
}(React.PureComponent);


DiagramPart.propTypes = {
  engine: propTypes.instanceOf(Engine).isRequired,
  id: propTypes.oneOfType([propTypes.string, propTypes.symbol]).isRequired
};

var EditPolicy = function () {
  function EditPolicy() {
    classCallCheck(this, EditPolicy);
  }

  createClass(EditPolicy, [{
    key: "perform",
    value: function perform() /* intent */{}
  }, {
    key: "requestFeedback",
    value: function requestFeedback() /* intent */{}
  }, {
    key: "eraseFeedback",
    value: function eraseFeedback() /* intent */{}
  }]);
  return EditPolicy;
}();

var DispatchingEditPolicy = function (_EditPolicy) {
  inherits(DispatchingEditPolicy, _EditPolicy);

  function DispatchingEditPolicy() {
    classCallCheck(this, DispatchingEditPolicy);
    return possibleConstructorReturn(this, (DispatchingEditPolicy.__proto__ || Object.getPrototypeOf(DispatchingEditPolicy)).apply(this, arguments));
  }

  createClass(DispatchingEditPolicy, [{
    key: 'perform',
    value: function perform(request) {
      switch (request.type) {
        case ADD:
          return this.add(request);
        case MOVE:
          return this.move(request);
        case START_CONNECTION:
          return this.startConnection(request);
        case END_CONNECTION:
          return this.endConnection(request);
        case SELECT:
          return this.select(request);
        case DELETE:
          return this.delete(request);
        default:
          throw new Error('Unknown request type ' + request.type);
      }
    }
  }, {
    key: 'requestFeedback',
    value: function requestFeedback(request) {
      switch (request.type) {
        case ADD:
          return this.requestAddFeedback(request);
        case MOVE:
          return this.requestMoveFeedback(request);
        case START_CONNECTION:
          return this.requestStartConnectionFeedback(request);
        case END_CONNECTION:
          return this.requestEndConnectionFeedback(request);
        case SELECT:
          return this.requestSelectFeedback(request);
        default:
          throw new Error('Unknown request type ' + request.type);
      }
    }
  }, {
    key: 'eraseFeedback',
    value: function eraseFeedback(request) {
      switch (request.type) {
        case ADD:
          return this.eraseAddFeedback(request);
        case MOVE:
          return this.eraseMoveFeedback(request);
        case START_CONNECTION:
          return this.eraseStartConnectionFeedback(request);
        case END_CONNECTION:
          return this.eraseEndConnectionFeedback(request);
        case SELECT:
          return this.eraseSelectFeedback(request);
        default:
          throw new Error('Unknown request type ' + request.type);
      }
    }
  }, {
    key: 'add',
    value: function add() /* request */{}
  }, {
    key: 'move',
    value: function move() /* request */{}
  }, {
    key: 'startConnection',
    value: function startConnection() /* request */{}
  }, {
    key: 'endConnection',
    value: function endConnection() /* request */{}
  }, {
    key: 'select',
    value: function select() /* request */{}
  }, {
    key: 'delete',
    value: function _delete() /* request */{}
  }, {
    key: 'requestAddFeedback',
    value: function requestAddFeedback() /* request */{}
  }, {
    key: 'requestMoveFeedback',
    value: function requestMoveFeedback() /* request */{}
  }, {
    key: 'requestStartConnectionFeedback',
    value: function requestStartConnectionFeedback() /* request */{}
  }, {
    key: 'requestEndConnectionFeedback',
    value: function requestEndConnectionFeedback() /* request */{}
  }, {
    key: 'requestSelectFeedback',
    value: function requestSelectFeedback() /* request */{}
  }, {
    key: 'eraseAddFeedback',
    value: function eraseAddFeedback() /* request */{}
  }, {
    key: 'eraseMoveFeedback',
    value: function eraseMoveFeedback() /* request */{}
  }, {
    key: 'eraseStartConnectionFeedback',
    value: function eraseStartConnectionFeedback() /* request */{}
  }, {
    key: 'eraseEndConnectionFeedback',
    value: function eraseEndConnectionFeedback() /* request */{}
  }, {
    key: 'eraseSelectFeedback',
    value: function eraseSelectFeedback() /* request */{}
  }]);
  return DispatchingEditPolicy;
}(EditPolicy);

var Capability = function () {
  function Capability(engine) {
    classCallCheck(this, Capability);

    this.progress = false;
    this.engine = engine;
  }

  createClass(Capability, [{
    key: "onKeyDown",
    value: function onKeyDown() {
      // emtpy
    }
  }, {
    key: "onKeyUp",
    value: function onKeyUp() {
      // empty
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown() {
      // empty
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove() {
      // empty
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp() {
      // empty
    }
  }, {
    key: "cancel",
    value: function cancel() {
      // empty
    }
  }]);
  return Capability;
}();

var SelectionProvider = function () {
  function SelectionProvider() {
    classCallCheck(this, SelectionProvider);
  }

  createClass(SelectionProvider, [{
    key: "selection",
    value: function selection() {
      return [];
    }
  }]);
  return SelectionProvider;
}();

var DOM = Symbol('DOM');
var COMPONENT = Symbol('COMPONENT');
var USER_COMPONENT = Symbol('USER_COMPONENT');

var ComponentWrapper = function () {
  function ComponentWrapper(dom, component, userComponent) {
    classCallCheck(this, ComponentWrapper);

    this[DOM] = dom;
    this[COMPONENT] = component;
    this[USER_COMPONENT] = userComponent;
  }

  createClass(ComponentWrapper, [{
    key: 'dom',
    get: function get$$1() {
      return this[DOM];
    }
  }, {
    key: 'component',
    get: function get$$1() {
      return this[COMPONENT];
    }
  }, {
    key: 'userComponent',
    get: function get$$1() {
      return this[USER_COMPONENT];
    }
  }]);
  return ComponentWrapper;
}();


var fromComponent = function fromComponent(component) {
  return new ComponentWrapper(reactDom.findDOMNode(component), component, component.userComponent);
};

var ComponentRegistry = function () {
  function ComponentRegistry() {
    classCallCheck(this, ComponentRegistry);

    this.init();
  }

  createClass(ComponentRegistry, [{
    key: 'init',
    value: function init() {
      this.mapping = new Map();
      this.wrappers = new Set();
      this.root = null;
      this.registerListeners = [];
      this.unregisterListeners = [];
    }
  }, {
    key: 'setRoot',
    value: function setRoot(root) {
      if (root && this.root) {
        throw new Error('Diagram can only contain a single root. ' + this.root + ' is already registered.');
      }
      if (root) {
        this.root = root;
      } else {
        this.init();
      }
    }
  }, {
    key: 'register',
    value: function register(wrapper) {
      if (!(wrapper instanceof ComponentWrapper)) {
        throw new TypeError('ComponentWrapper instance expected, got ' + wrapper);
      }
      this.mapping.set(wrapper, wrapper);
      this.mapping.set(wrapper.dom, wrapper);
      this.mapping.set(wrapper.component, wrapper);
      this.mapping.set(wrapper.userComponent, wrapper);
      this.wrappers.add(wrapper);
      this.registerListeners.forEach(function (listener) {
        return listener(wrapper);
      });
    }
  }, {
    key: 'unregister',
    value: function unregister(input) {
      var wrapper = this.get(input);
      if (wrapper !== undefined) {
        this.mapping.delete(wrapper);
        this.mapping.delete(wrapper.dom);
        this.mapping.delete(wrapper.component);
        this.mapping.delete(wrapper.userComponent);
        this.wrappers.delete(wrapper);
        this.unregisterListeners.forEach(function (listener) {
          return listener(wrapper);
        });
      }
    }
  }, {
    key: 'get',
    value: function get$$1(input) {
      return this.mapping.get(input);
    }
  }, {
    key: 'all',
    value: function all() {
      return Array.from(this.wrappers);
    }
  }, {
    key: 'has',
    value: function has(input) {
      return this.mapping.has(input);
    }
  }, {
    key: 'addRegisterListener',
    value: function addRegisterListener(listener) {
      this.registerListeners.push(listener);
    }
  }, {
    key: 'addUnregisterListener',
    value: function addUnregisterListener(listener) {
      this.unregisterListeners.push(listener);
    }
  }, {
    key: 'removeRegisterListener',
    value: function removeRegisterListener(listener) {
      this.registerListeners = this.registerListeners.filter(function (e) {
        return e !== listener;
      });
    }
  }, {
    key: 'removeUnregisterListener',
    value: function removeUnregisterListener(listener) {
      this.unregisterListeners = this.unregisterListeners.filter(function (e) {
        return e !== listener;
      });
    }
  }]);
  return ComponentRegistry;
}();

var REGISTRY = Symbol('REGISTRY');
var DOM_HELPER$1 = Symbol('DOM_HELPER');

var PartToolkit = function () {
  function PartToolkit(registry, domHelper) {
    classCallCheck(this, PartToolkit);

    this[REGISTRY] = registry;
    this[DOM_HELPER$1] = domHelper;
  }

  createClass(PartToolkit, [{
    key: 'root',
    value: function root() {
      var root = this[REGISTRY].root;
      if (root === undefined || root === null) {
        throw new Error('No root component!');
      }
      return this[REGISTRY].root.component.userComponent;
    }
  }, {
    key: 'parent',
    value: function parent(component) {
      var domHelper = this[DOM_HELPER$1];
      var registry = this[REGISTRY];
      var wrapper = registry.get(component);
      if (wrapper === undefined || wrapper === null) {
        throw new Error('Given component is not part of the diagram!');
      } else if (wrapper === registry.root) {
        return null;
      }
      var parent = domHelper.findClosest(wrapper.dom.parentNode);
      return parent === null ? null : parent.userComponent;
    }
  }, {
    key: 'children',
    value: function children(component) {
      var registry = this[REGISTRY];
      var domHelper = this[DOM_HELPER$1];
      var wrapper = registry.get(component);
      if (wrapper === undefined || wrapper === null) {
        throw new Error('Given component is not part of the diagram!');
      }
      var domChildren = domHelper.findRelevantChildren(wrapper.dom);
      var children = [];
      for (var i = 0, length = domChildren.length; i < length; i += 1) {
        var child = registry.get(domChildren[i]);
        if (child !== undefined && child !== null) {
          children.push(child.userComponent);
        }
      }
      return children;
    }
  }, {
    key: 'editPolicy',
    value: function editPolicy(component) {
      var registry = this[REGISTRY];
      var wrapper = registry.get(component);
      if (wrapper === undefined || wrapper === null) {
        throw new Error('Given component is not part of the diagram!');
      }
      return wrapper.component.editPolicy;
    }
  }, {
    key: 'ofType',
    value: function ofType(type) {
      var all = this[REGISTRY].all();
      var ofType = [];
      for (var i = 0, length = all.length; i < length; i += 1) {
        var wrapper = all[i];
        if (wrapper.component.type === type) {
          ofType.push(wrapper.userComponent);
        }
      }
      return ofType;
    }
  }, {
    key: 'nodes',
    value: function nodes() {
      return this.ofType(NODE_TYPE);
    }
  }, {
    key: 'ports',
    value: function ports() {
      return this.ofType(PORT_TYPE);
    }
  }, {
    key: 'connections',
    value: function connections() {
      return this.ofType(CONNECTION_TYPE);
    }
  }, {
    key: 'bounds',
    value: function bounds(component) {
      var registry = this[REGISTRY];
      var wrapper = registry.get(component);
      if (wrapper === undefined || wrapper === null) {
        throw new Error('Given component is not part of the diagram!');
      }

      var _wrapper$dom$getBound = wrapper.dom.getBoundingClientRect(),
          left = _wrapper$dom$getBound.left,
          top = _wrapper$dom$getBound.top,
          width = _wrapper$dom$getBound.width,
          height = _wrapper$dom$getBound.height;

      return regefGeometry.rectangle(left, top, width, height);
    }
  }]);
  return PartToolkit;
}();

var PartDomHelper = function () {
  function PartDomHelper(registry) {
    classCallCheck(this, PartDomHelper);

    this.registry = registry;
  }

  createClass(PartDomHelper, [{
    key: "findClosest",
    value: function findClosest(dom) {
      var matcher = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return true;
      };

      var root = this.registry.root.dom;
      for (var it = dom; it !== null; it = it.parentNode) {
        var wrapper = this.registry.get(it);
        if (wrapper !== undefined && wrapper !== null) {
          return matcher(wrapper) ? wrapper : null;
        }
        if (it === root) {
          return null;
        }
      }
      return null;
    }
  }, {
    key: "findRelevantChildrenIntenal",
    value: function findRelevantChildrenIntenal(node) {
      var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (node !== null && node.hasChildNodes()) {
        var childNodes = node.childNodes;
        for (var i = 0, len = childNodes.length; i < len; i += 1) {
          var childNode = childNodes[i];
          if (this.registry.has(childNode)) {
            children.push(childNode);
          } else {
            this.findRelevantChildrenIntenal(childNode, children);
          }
        }
      }
      return children;
    }
  }, {
    key: "findRelevantChildren",
    value: function findRelevantChildren(element) {
      return this.findRelevantChildrenIntenal(element, []);
    }
  }, {
    key: "findClosestParent",
    value: function findClosestParent(element) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (element === this.registry.root.dom) {
        return element;
      }
      return this.findClosestElement(element.parentNode, type);
    }
  }, {
    key: "partContains",
    value: function partContains(element) {
      return this.registry.root.dom.contains(element);
    }
  }]);
  return PartDomHelper;
}();

var ID = Symbol('id');
var ENGINE = Symbol('ENGINE');
var REGISTRY$1 = Symbol('REGISTRY');
var TOOLKIT$1 = Symbol('TOOLKIT');
var DOM_HELPER$2 = Symbol('DOM_HELPER');

var DiagramPartWrapper = function () {
  function DiagramPartWrapper(id, engine) {
    classCallCheck(this, DiagramPartWrapper);

    this[ID] = id;
    this[ENGINE] = engine;

    this[REGISTRY$1] = new ComponentRegistry();
    this[DOM_HELPER$2] = new PartDomHelper(this.registry);
    this[TOOLKIT$1] = new PartToolkit(this.registry, this[DOM_HELPER$2]);
  }

  createClass(DiagramPartWrapper, [{
    key: 'id',
    get: function get$$1() {
      return this[ID];
    }
  }, {
    key: 'registry',
    get: function get$$1() {
      return this[REGISTRY$1];
    }
  }, {
    key: 'toolkit',
    get: function get$$1() {
      return this[TOOLKIT$1];
    }
  }, {
    key: 'engine',
    get: function get$$1() {
      return this[ENGINE];
    }
  }, {
    key: 'domHelper',
    get: function get$$1() {
      return this[DOM_HELPER$2];
    }
  }]);
  return DiagramPartWrapper;
}();

function createDecorator(_ref) {
  var type = _ref.type,
      activate = _ref.activate,
      deactivate = _ref.deactivate,
      toolkitResolver = _ref.toolkitResolver;

  return function () {
    return function (Wrapped) {
      var DecoratedComponent = function (_PureComponent) {
        inherits(DecoratedComponent, _PureComponent);

        function DecoratedComponent(props) {
          classCallCheck(this, DecoratedComponent);

          var _this = possibleConstructorReturn(this, (DecoratedComponent.__proto__ || Object.getPrototypeOf(DecoratedComponent)).call(this, props));

          var regef = props[REGEF_PROP_KEY];
          _this.partId = regef;
          _this.userComponent = null;
          _this.type = type;
          _this.childProps = { toolkit: toolkitResolver(_this, regef)
            // binding methods
          };_this.setUserComponent = _this.setUserComponent.bind(_this);
          return _this;
        }

        createClass(DecoratedComponent, [{
          key: 'setUserComponent',
          value: function setUserComponent(ref) {
            this.userComponent = ref;
          }
        }, {
          key: 'componentDidMount',
          value: function componentDidMount() {
            activate(this, this.props[REGEF_PROP_KEY]);
          }
        }, {
          key: 'componentWillUnmount',
          value: function componentWillUnmount() {
            deactivate(this, this.props[REGEF_PROP_KEY]);
          }
        }, {
          key: 'render',
          value: function render() {
            var _props = this.props,
                children = _props.children,
                rest = objectWithoutProperties(_props, ['children']);

            return React__default.createElement(
              Wrapped,
              _extends({}, rest, { ref: this.setUserComponent, regef: this.childProps }),
              children
            );
          }
        }]);
        return DecoratedComponent;
      }(React.PureComponent);

      return withRegefContext(DecoratedComponent);
    };
  };
}

var matches = function matches(target, wrapper) {
  var userComponent = wrapper.userComponent,
      dom = wrapper.dom,
      component = wrapper.component;

  return wrapper === target || userComponent === target || dom === target || component === target;
};

var watchRegister = function watchRegister(registry, target) {
  return new Promise(function (resolve, reject) {
    if (!registry || !target) {
      reject(new Error('registry or target was falsy value'));
      return;
    }
    if (registry.has(target)) {
      resolve();
      return;
    }
    var listener = function listener(wrapper) {
      if (wrapper && matches(target, wrapper)) {
        try {
          resolve();
        } catch (e) {
          reject(e);
        } finally {
          registry.removeRegisterListener(listener);
        }
      }
    };
    registry.addRegisterListener(listener);
  });
};

var registryFrom = function registryFrom(_ref) {
  var engine = _ref.engine,
      id = _ref.id;
  return engine.__partsMap().has(id) ? engine.part(id).registry : null;
};

var toolkitFrom = function toolkitFrom(_ref2) {
  var engine = _ref2.engine,
      id = _ref2.id;
  return engine.__partsMap().has(id) ? engine.part(id).toolkit : null;
};

var ensurePartRegistered = function ensurePartRegistered(_ref3) {
  var engine = _ref3.engine,
      id = _ref3.id;

  var parts = engine.__partsMap();
  if (!parts.has(id)) {
    parts.set(id, new DiagramPartWrapper(id, engine));
  }
};

function defaultToolkitResolver(component, context) {
  ensurePartRegistered(context);
  return function () {
    return watchRegister(registryFrom(context), component).then(function () {
      return toolkitFrom(context);
    });
  };
}

var defaultActivate = function defaultActivate(component, context) {
  ensurePartRegistered(context);
  registryFrom(context).register(fromComponent(component));
};

var defaultDecativate = function defaultDecativate(component, context) {
  var registry = registryFrom(context);
  if (registry) {
    registry.unregister(component);
  }
};

var rootActivate = function rootActivate(component, context) {
  defaultActivate(component, context);
  var registry = registryFrom(context);
  registry.setRoot(registry.get(component));
};

var rootDeactivate = function rootDeactivate(component, context) {
  defaultDecativate(component, context);
  var registry = registryFrom(context);
  if (registry) {
    registry.setRoot(null);
  }
};

var node = createDecorator({
  type: NODE_TYPE,
  activate: defaultActivate,
  deactivate: defaultDecativate,
  toolkitResolver: defaultToolkitResolver
});

var port = createDecorator({
  type: PORT_TYPE,
  activate: defaultActivate,
  deactivate: defaultDecativate,
  toolkitResolver: defaultToolkitResolver
});

var root = createDecorator({
  type: ROOT_TYPE,
  activate: rootActivate,
  deactivate: rootDeactivate,
  toolkitResolver: defaultToolkitResolver
});

var connection = createDecorator({
  type: CONNECTION_TYPE,
  activate: defaultActivate,
  deactivate: defaultDecativate,
  toolkitResolver: defaultToolkitResolver
});

var matchesSingleType = function matchesSingleType(type) {
  return function (_ref) {
    var component = _ref.component;
    return component.type === type;
  };
};

var matchesMultiTypes = function matchesMultiTypes(types) {
  return function (_ref2) {
    var component = _ref2.component;
    return types.indexOf(component.type) >= 0;
  };
};

var matchesSinglePart = function matchesSinglePart(partId) {
  return function (part) {
    return part.id === partId;
  };
};

var matchesMultiParts = function matchesMultiParts(partIds) {
  return function (part) {
    return partIds.indexOf(part.id) >= 0;
  };
};

var alwaysTrue = function alwaysTrue() {
  return true;
};

var getSelection = function getSelection(engine) {
  if (engine && engine.selectionProvider instanceof SelectionProvider) {
    return engine.selectionProvider.selection();
  }
  return [];
};

var typeMatches = function typeMatches(types) {
  if (types === null || types === undefined) {
    return alwaysTrue;
  } else if (Array.isArray(types)) {
    return matchesMultiTypes(types);
  }
  return matchesSingleType(types);
};

var partMatches = function partMatches(ids) {
  if (ids === null || ids === undefined) {
    return alwaysTrue;
  } else if (Array.isArray(ids)) {
    return matchesMultiParts(ids);
  }
  return matchesSinglePart(ids);
};

var onEachPolicy = function onEachPolicy(callback) {
  return function (policies, intent) {
    if (Array.isArray(policies) && intent && intent.type) {
      for (var i = 0; i < policies.length; i += 1) {
        callback(policies[i], intent);
      }
    }
  };
};

var perform = onEachPolicy(function (policy, intent) {
  return policy.perform(intent);
});
var requestFeedback = onEachPolicy(function (policy, intent) {
  return policy.requestFeedback(intent);
});
var eraseFeedback = onEachPolicy(function (policy, intent) {
  return policy.eraseFeedback(intent);
});

var getParts = function getParts(engine) {
  var ids = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (ids === null || ids === undefined) {
    return engine.parts;
  }
  return ids.map(function (id) {
    return engine.part(id);
  });
};

// https://stackoverflow.com/a/12737882/1126273
var isLeftButton = function isLeftButton(e) {
  if ('buttons' in e) {
    return e.buttons === 1;
  } else if ('which' in e) {
    return e.which === 1;
  }
  return e.button === 1;
};

var ACCEPTED_TYPES = [NODE_TYPE, ROOT_TYPE];

var buildOffset = function buildOffset(_ref, element) {
  var clientX = _ref.clientX,
      clientY = _ref.clientY;

  var _element$getBoundingC = element.getBoundingClientRect(),
      x = _element$getBoundingC.x,
      y = _element$getBoundingC.y;

  return regefGeometry.point(clientX - x, clientY - y);
};

var DragCapability = function (_Capability) {
  inherits(DragCapability, _Capability);

  function DragCapability(engine) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { parts: null, types: [NODE_TYPE] };
    classCallCheck(this, DragCapability);

    var _this = possibleConstructorReturn(this, (DragCapability.__proto__ || Object.getPrototypeOf(DragCapability)).call(this, engine));

    _this.config = config;
    _this.init();
    return _this;
  }

  createClass(DragCapability, [{
    key: 'init',
    value: function init() {
      this.progress = false;
      this.target = null;
      this.lastTargetParent = null;
      this.targetParent = null;
      this.currentParent = null;
      this.coordinates = null;
      this.offset = null;
      this.lastRequest = null;
      this.mouseMoved = false;
      this.startLocation = null;
    }
  }, {
    key: 'findTargetedParent',
    value: function findTargetedParent(eventTarget, part) {
      var _this2 = this;

      var target = this.target,
          currentParent = this.currentParent;

      if (!part) {
        return null;
      }
      var newTarget = part.domHelper.findClosest(eventTarget, typeMatches(ACCEPTED_TYPES)); // TODO
      if (newTarget === null || newTarget === target || target !== null && target.dom.contains(newTarget.dom)) {
        return currentParent;
      }
      var selection = getSelection(this.engine);
      var affectedParts = selection.map(function (comp) {
        return _this2.engine.toolkit.forComponent(comp);
      });
      if (new Set(affectedParts).size !== 1) {
        return newTarget;
      }
      var affectedParents = selection.map(function (comp, i) {
        return affectedParts[i].toolkit.parent(comp);
      });
      if (new Set(affectedParents).size !== 1) {
        return newTarget;
      }
      var targets = [newTarget.userComponent, target.userComponent];
      if (targets.every(function (userComponent) {
        return selection.indexOf(userComponent) >= 0;
      })) {
        return currentParent;
      }
      return newTarget;
    }
  }, {
    key: 'deltaCoordinates',
    value: function deltaCoordinates(_ref2) {
      var clientX = _ref2.clientX,
          clientY = _ref2.clientY;

      return regefGeometry.point(clientX - this.startLocation.x, clientY - this.startLocation.y);
    }
  }, {
    key: 'screenCoordinates',
    value: function screenCoordinates(_ref3) {
      var clientX = _ref3.clientX,
          clientY = _ref3.clientY;

      return regefGeometry.point(clientX, clientY);
    }
  }, {
    key: 'offsetCoordinates',
    value: function offsetCoordinates() {
      return this.offset;
    }
  }, {
    key: 'locationCoordinates',
    value: function locationCoordinates(_ref4) {
      var clientX = _ref4.clientX,
          clientY = _ref4.clientY;

      return regefGeometry.point(clientX, clientY);
    }
  }, {
    key: 'updateCoordinates',
    value: function updateCoordinates(e, part) {
      this.coordinates = {
        offset: this.offsetCoordinates(),
        delta: this.deltaCoordinates(e),
        location: this.locationCoordinates(e, part)
      };
    }
  }, {
    key: 'updateParents',
    value: function updateParents(e, part) {
      var newTargetParent = this.findTargetedParent(e.target, part);
      var targetParent = this.targetParent;
      if (targetParent !== newTargetParent) {
        this.lastTargetParent = targetParent;
        this.targetParent = newTargetParent;
      } else {
        this.lastTargetParent = targetParent;
      }
    }
  }, {
    key: 'getMovedComponents',
    value: function getMovedComponents() {
      var target = this.target.userComponent;
      var selection = getSelection(this.engine);
      if (selection.indexOf(target) >= 0) {
        return selection;
      }
      return [target];
    }
  }, {
    key: 'getMoveChildRequest',
    value: function getMoveChildRequest() {
      return _extends({
        type: MOVE,
        components: this.getMovedComponents(),
        container: this.currentParent.component.userComponent
      }, this.coordinates);
    }
  }, {
    key: 'getAddChildRequest',
    value: function getAddChildRequest() {
      var targetParent = this.targetParent,
          currentParent = this.currentParent;

      return _extends({
        type: ADD,
        components: this.getMovedComponents(),
        targetContainer: targetParent === null ? null : targetParent.component.userComponent,
        container: currentParent.component.userComponent
      }, this.coordinates);
    }
  }, {
    key: 'getSelectionRequest',
    value: function getSelectionRequest() {
      var startLocation = this.startLocation,
          target = this.target;

      return {
        type: SELECT,
        bounds: regefGeometry.rectangle(startLocation, regefGeometry.dimension(0, 0)),
        startLocation: startLocation,
        endLocation: startLocation,
        selection: [target.userComponent]
      };
    }
  }, {
    key: 'handleFeedback',
    value: function handleFeedback(lastRequest, request) {
      var lastTargetParent = this.lastTargetParent,
          targetParent = this.targetParent;

      if (lastRequest !== null && lastTargetParent !== targetParent) {
        eraseFeedback(this.engine.editPolicies, lastRequest);
      }
      if (request !== null) {
        requestFeedback(this.engine.editPolicies, request);
      }
    }
  }, {
    key: 'buildDragRequest',
    value: function buildDragRequest(e) {
      var part = this.engine.domHelper.findPart(e.target, partMatches(this.config.parts));

      this.updateParents(e, part);
      this.updateCoordinates(e, part);

      var currentParent = this.currentParent,
          targetParent = this.targetParent;


      if (currentParent === targetParent) {
        return this.getMoveChildRequest();
      } else if (currentParent !== targetParent) {
        return this.getAddChildRequest();
      }
      return null;
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      if (this.progress) {
        if (this.lastRequest !== null && this.targetParent !== null) {
          eraseFeedback(this.engine.editPolicies, this.lastRequest);
        }
        this.init();
      }
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(e) {
      if (!isLeftButton(e)) {
        return;
      }
      var part = this.engine.domHelper.findPart(e.target, partMatches(this.config.parts));
      if (!part) {
        return;
      }
      this.target = part.domHelper.findClosest(e.target, typeMatches(this.config.types));
      if (this.target !== null) {
        var parent = part.domHelper.findClosest(this.target.dom.parentNode, function (wrapper) {
          return ACCEPTED_TYPES.indexOf(wrapper.component.type) >= 0;
        });
        this.currentParent = parent || part.registry.root;
        this.offset = buildOffset(e, this.target.dom);
        this.startLocation = regefGeometry.point(e.clientX, e.clientY);
        this.mouseMoved = false;
        this.progress = true;
      }
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(e) {
      if (!this.progress) {
        return;
      }
      this.mouseMoved = true;
      var request = this.buildDragRequest(e);
      if (getSelection(this.engine).indexOf(this.target.userComponent) < 0) {
        perform(this.engine.editPolicies, this.getSelectionRequest());
      }
      this.handleFeedback(this.lastRequest, request);
      if (request !== null) {
        this.lastRequest = request;
      }
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp(e) {
      if (!this.progress) {
        return;
      }
      var request = this.buildDragRequest(e);
      if (this.targetParent !== null && this.lastRequest !== null) {
        eraseFeedback(this.engine.editPolicies, this.lastRequest);
      }
      if (request !== null && this.mouseMoved) {
        perform(this.engine.editPolicies, request);
      }
      this.init();
    }
  }]);
  return DragCapability;
}(Capability);

var ConnectCapability = function (_Capability) {
  inherits(ConnectCapability, _Capability);

  function ConnectCapability(engine) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      parts: null,
      sourceTypes: [PORT_TYPE],
      targetTypes: [ROOT_TYPE, NODE_TYPE]
    };
    classCallCheck(this, ConnectCapability);

    var _this = possibleConstructorReturn(this, (ConnectCapability.__proto__ || Object.getPrototypeOf(ConnectCapability)).call(this, engine));

    _this.config = config;
    _this.init();
    return _this;
  }

  createClass(ConnectCapability, [{
    key: 'init',
    value: function init() {
      this.progress = false;
      this.source = null;
      this.target = null;
      this.coordinates = null;
      this.lastRequest = null;
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      if (this.progress) {
        if (this.lastRequest !== null) {
          eraseFeedback(this.engine.editPolicies, this.lastRequest);
        }
        this.init();
      }
    }
  }, {
    key: 'getStartConnectionRequest',
    value: function getStartConnectionRequest() {
      return {
        type: START_CONNECTION,
        source: this.source.component.userComponent,
        location: regefGeometry.point(this.coordinates)
      };
    }
  }, {
    key: 'getEndConnectionRequest',
    value: function getEndConnectionRequest() {
      return {
        type: END_CONNECTION,
        source: this.source.component.userComponent,
        target: this.target.component.userComponent,
        location: regefGeometry.point(this.coordinates)
      };
    }
  }, {
    key: 'buildEndConnectRequest',
    value: function buildEndConnectRequest(e) {
      var part = this.engine.domHelper.findPart(e.target, partMatches(this.config.parts));
      if (!part) {
        return null;
      }
      var target = part.domHelper.findClosest(e.target, typeMatches(this.config.targetTypes));
      if (!target) {
        return null;
      }
      this.target = target;
      this.coordinates = regefGeometry.point(e.clientX, e.clientY);
      return this.getEndConnectionRequest();
    }
  }, {
    key: 'buildStartConnectionRequest',
    value: function buildStartConnectionRequest(e) {
      var part = this.engine.domHelper.findPart(e.target, partMatches(this.config.parts));
      if (!part) {
        return null;
      }
      var source = part.domHelper.findClosest(e.target, typeMatches(this.config.sourceTypes));
      if (!source) {
        return null;
      }
      this.source = source;
      this.coordinates = regefGeometry.point(e.clientX, e.clientY);
      return this.getStartConnectionRequest();
    }
  }, {
    key: 'handleFeedback',
    value: function handleFeedback(lastRequest, request) {
      if (lastRequest !== null && (request === null || request.target !== lastRequest.target)) {
        eraseFeedback(this.engine.editPolicies, lastRequest);
      }
      if (request !== null) {
        requestFeedback(this.engine.editPolicies, request);
      }
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(e) {
      if (!isLeftButton(e)) {
        return;
      }
      var request = this.buildStartConnectionRequest(e);
      if (request !== null) {
        this.progress = true;
      }
      this.handleFeedback(this.lastRequest, request);
      this.lastRequest = request;
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(e) {
      if (!this.progress) {
        return;
      }
      var request = this.buildEndConnectRequest(e);
      this.handleFeedback(this.lastRequest, request);
      this.lastRequest = request;
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp(e) {
      if (!this.progress) {
        return;
      }
      var request = this.buildEndConnectRequest(e);
      if (this.lastRequest !== null) {
        eraseFeedback(this.engine.editPolicies, this.lastRequest);
      }
      if (request !== null) {
        perform(this.engine.editPolicies, request);
      }
      this.init();
    }
  }]);
  return ConnectCapability;
}(Capability);

var locationOf = function locationOf(_ref, rootDom) {
  var clientX = _ref.clientX,
      clientY = _ref.clientY;

  var _rootDom$getBoundingC = rootDom.getBoundingClientRect(),
      x = _rootDom$getBoundingC.x,
      y = _rootDom$getBoundingC.y;

  return regefGeometry.point(clientX - x, clientY - y);
};

var SingleSelectionCapability = function (_Capability) {
  inherits(SingleSelectionCapability, _Capability);

  function SingleSelectionCapability(engine) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { parts: null, types: [NODE_TYPE] };
    classCallCheck(this, SingleSelectionCapability);

    var _this = possibleConstructorReturn(this, (SingleSelectionCapability.__proto__ || Object.getPrototypeOf(SingleSelectionCapability)).call(this, engine));

    _this.config = config;
    _this.init();
    return _this;
  }

  createClass(SingleSelectionCapability, [{
    key: 'init',
    value: function init() {
      this.progress = false;
      this.location = null;
      this.possibleSingleSelection = false;
      this.additional = false;
      this.selection = [];
    }
  }, {
    key: 'createSingleSelectionRequest',
    value: function createSingleSelectionRequest() {
      var location = this.location,
          selection = this.selection,
          additional = this.additional;

      return {
        type: SELECT,
        bounds: regefGeometry.rectangle(location, regefGeometry.dimension(0, 0)),
        selection: additional ? getSelection(this.engine).concat(selection) : selection
      };
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      if (this.progress) {
        this.init();
      }
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(e) {
      if (!isLeftButton(e)) {
        return;
      }
      var part = this.engine.domHelper.findPart(e.target, partMatches(this.config.parts));
      if (!part) {
        return;
      }
      var target = part.domHelper.findClosest(e.target, typeMatches(this.config.types));
      if (!target) {
        return;
      }
      this.location = locationOf(e, part.registry.root.dom);
      this.selection = [target.userComponent];
      this.possibleSingleSelection = true;
      this.progress = true;
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove() {
      this.possibleSingleSelection = false;
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp(_ref2) {
      var ctrlKey = _ref2.ctrlKey,
          metaKey = _ref2.metaKey;

      if (!this.progress) {
        return;
      }
      if (this.possibleSingleSelection) {
        this.additional = metaKey || ctrlKey;
        perform(this.engine.editPolicies, this.createSingleSelectionRequest());
        this.additional = false;
      }
      this.init();
    }
  }]);
  return SingleSelectionCapability;
}(Capability);

var locationOf$1 = function locationOf(_ref) {
  var clientX = _ref.clientX,
      clientY = _ref.clientY;
  return regefGeometry.point(clientX, clientY);
};

var MultiSelectionCapability = function (_Capability) {
  inherits(MultiSelectionCapability, _Capability);

  function MultiSelectionCapability(engine) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      parts: null,
      types: [NODE_TYPE],
      intersection: false,
      containment: true
    };
    classCallCheck(this, MultiSelectionCapability);

    var _this = possibleConstructorReturn(this, (MultiSelectionCapability.__proto__ || Object.getPrototypeOf(MultiSelectionCapability)).call(this, engine));

    _this.config = config;
    _this.init();
    return _this;
  }

  createClass(MultiSelectionCapability, [{
    key: 'init',
    value: function init() {
      this.progress = false;
      this.startLocation = null;
      this.endLocation = null;
      this.lastRequest = null;
      this.startPart = null;
      this.endPart = null;
      this.selectionBounds = null;
      this.selection = null;
      this.additional = false;
    }
  }, {
    key: 'createMultiSelectionRequest',
    value: function createMultiSelectionRequest() {
      var startLocation = this.startLocation,
          endLocation = this.endLocation,
          selectionBounds = this.selectionBounds,
          selection = this.selection;

      return {
        type: SELECT,
        bounds: selectionBounds,
        selection: selection || [],
        startLocation: startLocation,
        endLocation: endLocation
      };
    }
  }, {
    key: 'buildSelectionBounds',
    value: function buildSelectionBounds() {
      var startLocation = this.startLocation,
          endLocation = this.endLocation;

      if (!startLocation || !endLocation) {
        return;
      }
      var x1 = startLocation.x,
          y1 = startLocation.y;
      var x2 = endLocation.x,
          y2 = endLocation.y;

      var x = Math.min(x1, x2);
      var y = Math.min(y1, y2);
      var width = Math.max(x1, x2) - x;
      var height = Math.max(y1, y2) - y;

      this.selectionBounds = regefGeometry.rectangle(x, y, width, height);
    }
  }, {
    key: 'buildSelection',
    value: function buildSelection() {
      var config = this.config,
          engine = this.engine,
          selectionBounds = this.selectionBounds,
          additional = this.additional;


      var parts = getParts(engine, config.parts).filter(function (part) {
        var bounds = regefGeometry.rectangle(part.registry.root.dom.getBoundingClientRect());
        return bounds.intersection(selectionBounds) !== null;
      });

      var currentSelection = getSelection(engine);
      var newSelection = [];

      var isRelevant = typeMatches(config.types);
      var additionalFilter = additional ? function (_ref2) {
        var userComponent = _ref2.userComponent;
        return currentSelection.indexOf(userComponent) < 0;
      } : alwaysTrue;
      var boundsMatch = config.containment ? function (itemBounds) {
        return selectionBounds.containsRectangle(itemBounds);
      } : function (itemBounds) {
        return selectionBounds.intersection(itemBounds) !== null;
      };

      parts.forEach(function (part) {
        part.registry.all().forEach(function (wrapper) {
          var bounds = regefGeometry.rectangle(wrapper.dom.getBoundingClientRect());
          if (isRelevant(wrapper) && additionalFilter(wrapper) && boundsMatch(bounds)) {
            newSelection.push(wrapper.userComponent);
          }
        });
      });

      this.selection = additional ? currentSelection.concat(newSelection) : newSelection;
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      if (this.progress) {
        if (this.lastRequest !== null) {
          eraseFeedback(this.engine.editPolicies, this.lastRequest);
        }
        this.startLocation = null;
        this.endLocation = null;
        this.possibleSingleSelection = false;
        this.progress = false;
        this.selection = null;
        this.selectionBounds = null;
      }
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(e) {
      if (!isLeftButton(e)) {
        return;
      }
      var part = this.engine.domHelper.findPart(e.target, partMatches(this.config.parts));
      if (!part) {
        return;
      }
      var target = part.domHelper.findClosest(e.target, typeMatches(ROOT_TYPE));
      if (target !== null) {
        this.startLocation = locationOf$1(e);
        this.progress = true;
        this.startPart = part;
      }
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(e) {
      if (!this.progress) {
        return;
      }
      this.endPart = this.engine.domHelper.findPart(e.target, partMatches(this.config.parts));
      this.endLocation = locationOf$1(e);
      this.additional = Boolean(e.shiftKey);

      this.buildSelectionBounds();
      this.buildSelection();

      var request = this.createMultiSelectionRequest();
      requestFeedback(this.engine.editPolicies, request);
      this.lastRequest = request;
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp(e) {
      if (!this.progress) {
        return;
      }
      this.endPart = this.engine.domHelper.findPart(e.target, partMatches(this.config.parts));
      this.endLocation = locationOf$1(e);
      this.additional = Boolean(e.shiftKey);

      var request = this.createMultiSelectionRequest();
      if (this.lastRequest !== null) {
        eraseFeedback(this.engine.editPolicies, this.lastRequest);
      }
      perform(this.engine.editPolicies, request);
      this.progress = false;
      this.additional = false;
      this.selection = null;
      this.selectionBounds = null;
    }
  }]);
  return MultiSelectionCapability;
}(Capability);

var CancelCapability = function (_Capability) {
  inherits(CancelCapability, _Capability);

  function CancelCapability(engine) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { parts: null, keys: ['Escape'] };
    classCallCheck(this, CancelCapability);

    var _this = possibleConstructorReturn(this, (CancelCapability.__proto__ || Object.getPrototypeOf(CancelCapability)).call(this, engine));

    _this.config = config;
    return _this;
  }

  createClass(CancelCapability, [{
    key: 'focusOnTargetedParts',
    value: function focusOnTargetedParts(target) {
      return Boolean(this.engine.domHelper.findPart(target, partMatches(this.config.parts)));
    }
  }, {
    key: 'keyMatches',
    value: function keyMatches(key) {
      return this.config.keys.indexOf(key) >= 0;
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(_ref) {
      var key = _ref.key,
          target = _ref.target;

      if (this.keyMatches(key) && this.focusOnTargetedParts(target)) {
        this.engine.capabilities.forEach(function (capability) {
          return capability.cancel();
        });
      }
    }
  }]);
  return CancelCapability;
}(Capability);

var DeleteCapability = function (_Capability) {
  inherits(DeleteCapability, _Capability);

  function DeleteCapability(engine) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { parts: null, keys: ['Backspace', 'Delete'] };
    classCallCheck(this, DeleteCapability);

    var _this = possibleConstructorReturn(this, (DeleteCapability.__proto__ || Object.getPrototypeOf(DeleteCapability)).call(this, engine));

    _this.config = config;
    _this.init();
    return _this;
  }

  createClass(DeleteCapability, [{
    key: 'init',
    value: function init() {
      this.currentSelection = [];
      this.progress = false;
    }
  }, {
    key: 'getDeleteRequest',
    value: function getDeleteRequest() {
      return {
        type: DELETE,
        selection: this.currentSelection
      };
    }
  }, {
    key: 'focusOnTargetedParts',
    value: function focusOnTargetedParts(target) {
      return Boolean(this.engine.domHelper.findPart(target, partMatches(this.config.parts)));
    }
  }, {
    key: 'keyMatches',
    value: function keyMatches(key) {
      return this.config.keys.indexOf(key) >= 0;
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(_ref) {
      var key = _ref.key,
          target = _ref.target;

      if (this.keyMatches(key) && this.focusOnTargetedParts(target)) {
        this.currentSelection = getSelection(this.engine);
        if (this.currentSelection.length > 0) {
          perform(this.engine.editPolicies, this.getDeleteRequest());
        }
      }
      this.init();
    }
  }]);
  return DeleteCapability;
}(Capability);

exports.DiagramPart = DiagramPart;
exports.EditPolicy = EditPolicy;
exports.DispatchingEditPolicy = DispatchingEditPolicy;
exports.Engine = Engine;
exports.Capability = Capability;
exports.SelectionProvider = SelectionProvider;
exports.root = root;
exports.connection = connection;
exports.node = node;
exports.port = port;
exports.DragCapability = DragCapability;
exports.ConnectCapability = ConnectCapability;
exports.SingleSelectionCapability = SingleSelectionCapability;
exports.MultiSelectionCapability = MultiSelectionCapability;
exports.CancelCapability = CancelCapability;
exports.DeleteCapability = DeleteCapability;
exports.REGEF_PROP_KEY = REGEF_PROP_KEY;
exports.ROOT_TYPE = ROOT_TYPE;
exports.NODE_TYPE = NODE_TYPE;
exports.PORT_TYPE = PORT_TYPE;
exports.CONNECTION_TYPE = CONNECTION_TYPE;
exports.ADD = ADD;
exports.CREATE = CREATE;
exports.MOVE = MOVE;
exports.SELECT = SELECT;
exports.DELETE = DELETE;
exports.START_CONNECTION = START_CONNECTION;
exports.END_CONNECTION = END_CONNECTION;
