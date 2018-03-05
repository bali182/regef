'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var reactDom = require('react-dom');
var regefGeometry = require('regef-geometry');
var React = require('react');
var React__default = _interopDefault(React);
var propTypes = require('prop-types');

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

var SelectionProvider = function () {
  function SelectionProvider() {
    classCallCheck(this, SelectionProvider);

    this.toolkit = null;
    this.dependencies = {};
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

    this.mapping = new Map();
    this.wrappers = new Set();
    this.root = null;
    this.registerListeners = [];
    this.unregisterListeners = [];
  }

  createClass(ComponentRegistry, [{
    key: 'setRoot',
    value: function setRoot(root) {
      if (root && this.root) {
        throw new Error('Diagram can only contain a single root. ' + this.root + ' is already registered.');
      }
      this.root = root;
      if (!root) {
        this.mapping.clear();
        this.wrappers.clear();
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

var DomHelper = function () {
  function DomHelper(registry) {
    classCallCheck(this, DomHelper);

    this.registry = registry;
  }

  createClass(DomHelper, [{
    key: "findClosest",
    value: function findClosest(dom) {
      var matcher = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var root = this.registry.root.dom;
      for (var it = dom; it !== null; it = it.parentNode) {
        var wrapper = this.registry.get(it);
        if (wrapper !== undefined && wrapper !== null) {
          return this.matches(wrapper, matcher) ? wrapper : null;
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
    key: "isInsideDiagram",
    value: function isInsideDiagram(element) {
      return this.registry.root.dom.contains(element);
    }
  }, {
    key: "matches",
    value: function matches(wrapper, matcher) {
      if (wrapper === null) {
        return false;
      }
      if (matcher === null) {
        return true;
      }
      if (matcher instanceof Function) {
        return matcher(wrapper);
      } else if (Array.isArray(matcher)) {
        for (var i = 0, len = matcher.length; i < len; i += 1) {
          var it = matcher[i];
          if (it === wrapper.component.type) {
            return true;
          }
        }
      }
      return matcher === wrapper.component.type;
    }
  }]);
  return DomHelper;
}();

// Diagram participant types
var ROOT_TYPE = 'root';
var NODE_TYPE = 'node';
var PORT_TYPE = 'port';
var CONNECTION_TYPE = 'connection';
var ATTACHMENT_TYPE = 'attachment';
var CREATOR_TYPE = 'palette-entry';

// Request types
var ADD = 'add';
var CREATE = 'create';
var MOVE = 'move';
var SELECT = 'select';
var DELETE = 'delete';
var START_CONNECTION = 'start-connection';
var END_CONNECTION = 'end-connection';

// Internal constants
var DEFAULT_PART_ID = Symbol('DEFAULT_PART_ID');

var REGISTRY = Symbol('REGISTRY');
var DOM_HELPER = Symbol('DOM_HELPER');

var PartToolkit = function () {
  function PartToolkit(registry) {
    classCallCheck(this, PartToolkit);

    this[REGISTRY] = registry;
    this[DOM_HELPER] = new DomHelper(registry);
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
      var domHelper = this[DOM_HELPER];
      var registry = this[REGISTRY];
      var wrapper = registry.get(component);
      if (wrapper === undefined || wrapper === null) {
        throw new Error('Given component is not part of the diagram!');
      } else if (wrapper === registry.root) {
        return null;
      }
      var parent = domHelper.findClosest(wrapper.dom.parentNode, null);
      return parent === null ? null : parent.userComponent;
    }
  }, {
    key: 'children',
    value: function children(component) {
      var registry = this[REGISTRY];
      var domHelper = this[DOM_HELPER];
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

      var _registry$root$dom$ge = registry.root.dom.getBoundingClientRect(),
          rLeft = _registry$root$dom$ge.left,
          rTop = _registry$root$dom$ge.top;

      var _wrapper$dom$getBound = wrapper.dom.getBoundingClientRect(),
          left = _wrapper$dom$getBound.left,
          top = _wrapper$dom$getBound.top,
          width = _wrapper$dom$getBound.width,
          height = _wrapper$dom$getBound.height;

      return regefGeometry.rectangle(left - rLeft, top - rTop, width, height);
    }
  }]);
  return PartToolkit;
}();

var ID = Symbol('id');
var ENGINE = Symbol('ENGINE');
var REGISTRY$1 = Symbol('REGISTRY');
var TOOLKIT = Symbol('TOOLKIT');
var DOM_HELPER$1 = Symbol('DOM_HELPER');

var DiagramPartWrapper = function () {
  function DiagramPartWrapper(id, engine) {
    classCallCheck(this, DiagramPartWrapper);

    this[ID] = id;
    this[ENGINE] = engine;

    this[REGISTRY$1] = new ComponentRegistry();
    this[TOOLKIT] = new PartToolkit(this.registry);
    this[DOM_HELPER$1] = new DomHelper(this.registry);
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
      return this[TOOLKIT];
    }
  }, {
    key: 'engine',
    get: function get$$1() {
      return this[ENGINE];
    }
  }, {
    key: 'domHelper',
    get: function get$$1() {
      return this[DOM_HELPER$1];
    }
  }]);
  return DiagramPartWrapper;
}();

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
    key: 'forDefaultPart',
    value: function forDefaultPart() {
      return this.forPart(DEFAULT_PART_ID);
    }
  }, {
    key: 'forPart',
    value: function forPart(id) {
      var part = this.engine.part(id);
      if (part === null) {
        throw new Error('DiagramPart ' + id + ' hasn\'t been registered.');
      }
      return part ? part.toolkit : null;
    }
  }, {
    key: 'forComponent',
    value: function forComponent(component) {
      var parts = this.engine.parts();
      for (var i = 0, length = parts.length; i < length; i += 1) {
        var part = parts[i];
        if (part.registry.has(component)) {
          return part;
        }
      }
      throw new Error('Component ' + component + ' is not registered in any DiagramParts.');
    }
  }]);
  return Toolkit;
}();

var SELECTION_PROVIDER = Symbol('SELECTION_PROVIDER');
var CAPABILITIES = Symbol('CAPABILITIES');
var TOOLKIT$1 = Symbol('TOOLKIT');
var EVENT_MANAGER = Symbol('EVENT_MANAGER');
var EDIT_POLICIES = Symbol('EDIT_POLICIES');
var DEPENDENCIES = Symbol('DEPENDENCIES');
var PARTS = Symbol('PARTS');

var Engine = function () {
  function Engine(_ref) {
    var _this = this;

    var _ref$dependencies = _ref.dependencies,
        dependencies = _ref$dependencies === undefined ? {} : _ref$dependencies,
        _ref$capabilities = _ref.capabilities,
        capabilities = _ref$capabilities === undefined ? [] : _ref$capabilities,
        _ref$editPolicies = _ref.editPolicies,
        editPolicies = _ref$editPolicies === undefined ? [] : _ref$editPolicies,
        _ref$selectionProvide = _ref.selectionProvider,
        selectionProvider = _ref$selectionProvide === undefined ? new SelectionProvider() : _ref$selectionProvide;
    classCallCheck(this, Engine);

    this[CAPABILITIES] = capabilities;
    this[SELECTION_PROVIDER] = selectionProvider;
    this[EDIT_POLICIES] = editPolicies;
    this[DEPENDENCIES] = dependencies;

    this[TOOLKIT$1] = new Toolkit(this);
    this[EVENT_MANAGER] = new EventManager(this);
    this[PARTS] = new Map();

    /* eslint-disable no-param-reassign */
    this.editPolicies.forEach(function (policy) {
      policy.dependencies = dependencies;
      policy.toolkit = _this.toolkit;
    });
    this.capabilities.forEach(function (capability) {
      capability.engine = _this;
    });
    /* eslint-enable no-param-reassign */
    this.selectionProvider.dependencies = dependencies;
    this.selectionProvider.toolkit = this.toolkit;
  }

  createClass(Engine, [{
    key: 'part',
    value: function part() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_PART_ID;

      var parts = this[PARTS];
      if (!parts.has(id)) {
        var part = new DiagramPartWrapper(id, this);
        parts.set(id, part);
      }
      return parts.get(id);
    }
  }, {
    key: 'removePart',
    value: function removePart() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_PART_ID;
      this[PARTS].delete(id);
    }
  }, {
    key: 'selection',
    value: function selection() {
      return this.selectionProvider.selection();
    }
  }, {
    key: 'parts',
    get: function get$$1() {
      return Array.from(this[PARTS].values());
    }
  }, {
    key: 'registry',
    get: function get$$1() {
      return this[PARTS].get(DEFAULT_PART_ID).registry;
    }
  }, {
    key: 'domHelper',
    get: function get$$1() {
      return this[PARTS].get(DEFAULT_PART_ID).domHelper;
    }
  }, {
    key: 'eventManager',
    get: function get$$1() {
      return this[EVENT_MANAGER];
    }
  }, {
    key: 'toolkit',
    get: function get$$1() {
      return this[TOOLKIT$1];
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
  }, {
    key: 'dependencies',
    get: function get$$1() {
      return this[DEPENDENCIES];
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

      engine.removePart(id);
      if (engine.parts.length === 0) {
        engine.eventManager.unhookListeners();
      }
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return { regef: { engine: this.props.engine, id: this.props.id } };
    }
  }, {
    key: 'render',
    value: function render() {
      // TODO check type (no solution yet)
      return React.Children.only(this.props.children);
    }
  }]);
  return DiagramPart;
}(React.PureComponent);


DiagramPart.childContextTypes = {
  regef: propTypes.shape({
    engine: propTypes.instanceOf(Engine).isRequired,
    id: propTypes.oneOfType([propTypes.string, propTypes.symbol]).isRequired
  })
};

DiagramPart.propTypes = {
  engine: propTypes.instanceOf(Engine).isRequired,
  id: propTypes.oneOfType([propTypes.string, propTypes.symbol])
};

DiagramPart.defaultProps = {
  id: DEFAULT_PART_ID
};

var EditPolicy = function () {
  function EditPolicy() {
    classCallCheck(this, EditPolicy);

    this.toolkit = null;
    this.dependencies = {};
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


var perform = function perform(policies, intent) {
  return policies.forEach(function (policy) {
    return policy.perform(intent);
  });
};

var requestFeedback = function requestFeedback(policies, intent) {
  return policies.forEach(function (policy) {
    return policy.requestFeedback(intent);
  });
};

var eraseFeedback = function eraseFeedback(policies, intent) {
  return policies.forEach(function (policy) {
    return policy.eraseFeedback(intent);
  });
};

var DispatchingEditPolicy = function (_EditPolicy) {
  inherits(DispatchingEditPolicy, _EditPolicy);

  function DispatchingEditPolicy() {
    classCallCheck(this, DispatchingEditPolicy);
    return possibleConstructorReturn(this, (DispatchingEditPolicy.__proto__ || Object.getPrototypeOf(DispatchingEditPolicy)).apply(this, arguments));
  }

  createClass(DispatchingEditPolicy, [{
    key: 'perform',
    value: function perform$$1(request) {
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
        case CREATE:
          return this.create(request);
        default:
          throw new Error('Unknown request type ' + request.type);
      }
    }
  }, {
    key: 'requestFeedback',
    value: function requestFeedback$$1(request) {
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
        case CREATE:
          return this.requestCreateFeedback(request);
        default:
          throw new Error('Unknown request type ' + request.type);
      }
    }
  }, {
    key: 'eraseFeedback',
    value: function eraseFeedback$$1(request) {
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
        case CREATE:
          return this.eraseCreateFeedback(request);
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
    key: 'create',
    value: function create() /* request */{}
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
    key: 'requestCreateFeedback',
    value: function requestCreateFeedback() /* request */{}
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
  }, {
    key: 'eraseCreateFeedback',
    value: function eraseCreateFeedback() /* request */{}
  }]);
  return DispatchingEditPolicy;
}(EditPolicy);

var Capability = function () {
  function Capability() {
    classCallCheck(this, Capability);

    this.progress = false;
    this.engine = null;
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

function createDecorator(_ref) {
  var type = _ref.type,
      activate = _ref.activate,
      deactivate = _ref.deactivate,
      toolkitResolver = _ref.toolkitResolver;

  return function () {
    return function (Wrapped) {
      var DecoratedComponent = function (_PureComponent) {
        inherits(DecoratedComponent, _PureComponent);

        function DecoratedComponent(props, context) {
          classCallCheck(this, DecoratedComponent);

          var _this = possibleConstructorReturn(this, (DecoratedComponent.__proto__ || Object.getPrototypeOf(DecoratedComponent)).call(this, props, context));

          var id = _this.context.regef.id;

          _this.partId = id;
          _this.userComponent = null;
          _this.type = type;
          _this.childProps = { toolkit: toolkitResolver(_this, context.regef)
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
            activate(this, this.context.regef);
          }
        }, {
          key: 'componentWillUnmount',
          value: function componentWillUnmount() {
            deactivate(this, this.context.regef);
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

      DecoratedComponent.contextTypes = {
        regef: propTypes.shape({
          engine: propTypes.instanceOf(Engine).isRequired,
          id: propTypes.oneOfType([propTypes.string, propTypes.symbol])
        })
      };

      return DecoratedComponent;
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
  return id === undefined ? engine.registry : engine.part(id).registry;
};

var toolkitFrom = function toolkitFrom(_ref2) {
  var engine = _ref2.engine,
      id = _ref2.id;
  return id === undefined ? engine.toolkit : engine.part(id).toolkit;
};

function defaultToolkitResolver(component, context) {
  return function () {
    return watchRegister(registryFrom(context), component).then(function () {
      return toolkitFrom(context);
    });
  };
}

var defaultActivate = function defaultActivate(component, context) {
  registryFrom(context).register(fromComponent(component));
};

var defaultDecativate = function defaultDecativate(component, context) {
  registryFrom(context).unregister(component);
};

var rootActivate = function rootActivate(component, context) {
  defaultActivate(component, context);
  var registry = registryFrom(context);
  registry.setRoot(registry.get(component));
};

var rootDeactivate = function rootDeactivate(component, context) {
  defaultDecativate(component, context);
  registryFrom(context).setRoot(null);
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

var attachment = createDecorator({
  type: ATTACHMENT_TYPE,
  activate: rootActivate,
  deactivate: rootDeactivate,
  toolkitResolver: defaultToolkitResolver
});

var creator = createDecorator({
  type: CREATOR_TYPE,
  activate: defaultActivate,
  deactivate: defaultDecativate,
  toolkitResolver: defaultToolkitResolver
});

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

  function DragCapability() {
    classCallCheck(this, DragCapability);

    var _this = possibleConstructorReturn(this, (DragCapability.__proto__ || Object.getPrototypeOf(DragCapability)).call(this));

    _this.target = null;
    _this.lastTargetParent = null;
    _this.targetParent = null;
    _this.currentParent = null;
    _this.coordinates = null;
    _this.offset = null;
    _this.lastRequest = null;
    _this.mouseMoved = false;
    _this.startLocation = null;
    return _this;
  }

  createClass(DragCapability, [{
    key: 'findTargetedParent',
    value: function findTargetedParent(eventTarget) {
      var target = this.target,
          currentParent = this.currentParent;

      var newTarget = this.engine.domHelper.findClosest(eventTarget, ACCEPTED_TYPES);
      if (newTarget === null || newTarget === target || target.dom.contains(newTarget.dom) || this.engine.selection().indexOf(newTarget.userComponent) >= 0) {
        return currentParent;
      }
      return newTarget;
    }
  }, {
    key: 'updateCoordinates',
    value: function updateCoordinates(_ref2) {
      var clientX = _ref2.clientX,
          clientY = _ref2.clientY;

      var _engine$registry$root = this.engine.registry.root.dom.getBoundingClientRect(),
          rootX = _engine$registry$root.x,
          rootY = _engine$registry$root.y;

      var location = regefGeometry.point(clientX - rootX, clientY - rootY);
      var delta = regefGeometry.point(clientX - this.startLocation.x, clientY - this.startLocation.y);
      this.coordinates = {
        location: location,
        offset: this.offset,
        delta: delta
      };
    }
  }, {
    key: 'updateParents',
    value: function updateParents(e) {
      var newTargetParent = this.findTargetedParent(e.target);
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
      if (this.engine.selection().indexOf(target) >= 0) {
        return this.engine.selection();
      }
      return [target];
    }
  }, {
    key: 'getMoveChildRequest',
    value: function getMoveChildRequest() {
      var currentParent = this.currentParent,
          coordinates = this.coordinates;
      var location = coordinates.location,
          offset = coordinates.offset,
          delta = coordinates.delta;

      return {
        type: MOVE,
        components: this.getMovedComponents(),
        container: currentParent.component.userComponent,
        location: location,
        offset: offset,
        delta: delta
      };
    }
  }, {
    key: 'getAddChildRequest',
    value: function getAddChildRequest() {
      var targetParent = this.targetParent,
          currentParent = this.currentParent,
          coordinates = this.coordinates;
      var location = coordinates.location,
          offset = coordinates.offset,
          delta = coordinates.delta;

      return {
        type: ADD,
        components: this.getMovedComponents(),
        targetContainer: targetParent.component.userComponent,
        container: currentParent.component.userComponent,
        location: location,
        offset: offset,
        delta: delta
      };
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

      if (lastRequest !== null && lastTargetParent.dom !== targetParent.dom && lastTargetParent.component !== null) {
        eraseFeedback(this.engine.editPolicies, lastRequest);
      }
      if (request !== null) {
        requestFeedback(this.engine.editPolicies, request);
      }
    }
  }, {
    key: 'isMoveChild',
    value: function isMoveChild() {
      return this.currentParent === this.targetParent;
    }
  }, {
    key: 'isAddChild',
    value: function isAddChild() {
      return this.currentParent !== this.targetParent;
    }
  }, {
    key: 'buildDragRequest',
    value: function buildDragRequest(e) {
      if (!this.engine.domHelper.isInsideDiagram(e.target)) {
        return null;
      }

      this.updateParents(e);
      this.updateCoordinates(e);

      if (this.isMoveChild(e)) {
        return this.getMoveChildRequest();
      } else if (this.isAddChild(e)) {
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
        this.progress = false;
        this.lastRequest = null;
        this.offset = null;
        this.coordinates = null;
        this.targetParent = null;
        this.target = null;
        this.currentParent = null;
      }
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(e) {
      if (!this.engine.domHelper.isInsideDiagram(e.target)) {
        return;
      }
      this.target = this.engine.domHelper.findClosest(e.target, NODE_TYPE);
      if (this.target !== null) {
        var parent = this.engine.domHelper.findClosest(this.target.dom.parentNode, ACCEPTED_TYPES);
        this.currentParent = parent || this.engine.registry.root;
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
      var selection = this.engine.selection();
      if (selection.indexOf(this.target.userComponent) < 0) {
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
      this.progress = false;
    }
  }]);
  return DragCapability;
}(Capability);

var ConnectMouseHandler = function (_Capability) {
  inherits(ConnectMouseHandler, _Capability);

  function ConnectMouseHandler() {
    classCallCheck(this, ConnectMouseHandler);

    var _this = possibleConstructorReturn(this, (ConnectMouseHandler.__proto__ || Object.getPrototypeOf(ConnectMouseHandler)).call(this));

    _this.source = null;
    _this.target = null;
    _this.coordinates = null;
    _this.lastRequest = null;
    return _this;
  }

  createClass(ConnectMouseHandler, [{
    key: 'cancel',
    value: function cancel() {
      if (this.progress) {
        if (this.lastRequest !== null) {
          eraseFeedback(this.engine.editPolicies, this.lastRequest);
        }
        this.source = null;
        this.target = null;
        this.progress = false;
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
    key: 'buildCoordinates',
    value: function buildCoordinates(_ref) {
      var clientX = _ref.clientX,
          clientY = _ref.clientY;

      var _engine$registry$root = this.engine.registry.root.dom.getBoundingClientRect(),
          top = _engine$registry$root.top,
          left = _engine$registry$root.left;

      var x = clientX - left;
      var y = clientY - top;
      return { x: x, y: y };
    }
  }, {
    key: 'buildEndConnectRequest',
    value: function buildEndConnectRequest(e) {
      if (!this.engine.domHelper.isInsideDiagram(e.target)) {
        return null;
      }

      this.target = this.engine.domHelper.findClosest(e.target);
      this.coordinates = this.buildCoordinates(e);
      return this.getEndConnectionRequest();
    }
  }, {
    key: 'buildStartConnectionRequest',
    value: function buildStartConnectionRequest(e) {
      if (!this.engine.domHelper.isInsideDiagram(e.target)) {
        return null;
      }
      var source = this.engine.domHelper.findClosest(e.target, PORT_TYPE);
      if (source !== null) {
        this.source = source;
        this.coordinates = this.buildCoordinates(e);
        return this.getStartConnectionRequest();
      }
      return null;
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
      this.progress = false;
    }
  }]);
  return ConnectMouseHandler;
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

  function SingleSelectionCapability() {
    classCallCheck(this, SingleSelectionCapability);

    var _this = possibleConstructorReturn(this, (SingleSelectionCapability.__proto__ || Object.getPrototypeOf(SingleSelectionCapability)).call(this));

    _this.startLocation = null;
    _this.endLocation = null;
    _this.possibleSingleSelection = false;
    _this.additional = false;
    _this.selection = [];
    return _this;
  }

  createClass(SingleSelectionCapability, [{
    key: 'createSingleSelectionRequest',
    value: function createSingleSelectionRequest() {
      var startLocation = this.startLocation,
          endLocation = this.endLocation,
          selection = this.selection,
          additional = this.additional;

      return {
        type: SELECT,
        bounds: regefGeometry.rectangle(startLocation, regefGeometry.dimension(0, 0)),
        startLocation: startLocation,
        endLocation: endLocation,
        selection: additional ? this.engine.selection().concat(selection) : selection
      };
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      if (this.progress) {
        this.startLocation = null;
        this.endLocation = null;
        this.possibleSingleSelection = false;
        this.selection = [];
        this.progress = false;
      }
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(e) {
      if (!this.engine.domHelper.isInsideDiagram(e.target)) {
        return;
      }
      var target = this.engine.domHelper.findClosest(e.target, NODE_TYPE);
      if (target !== null) {
        this.startLocation = locationOf(e, this.engine.registry.root.dom);
        this.selection = [target.userComponent];
        this.possibleSingleSelection = true;
        this.progress = true;
      }
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
      this.endLocation = this.startLocation;
      if (this.possibleSingleSelection) {
        this.additional = metaKey || ctrlKey;
        perform(this.engine.editPolicies, this.createSingleSelectionRequest());
        this.additional = false;
      }
    }
  }]);
  return SingleSelectionCapability;
}(Capability);

var buildBounds = function buildBounds(_ref, _ref2) {
  var x1 = _ref.x,
      y1 = _ref.y;
  var x2 = _ref2.x,
      y2 = _ref2.y;

  var x = Math.min(x1, x2);
  var y = Math.min(y1, y2);
  var width = Math.max(x1, x2) - x;
  var height = Math.max(y1, y2) - y;
  return regefGeometry.rectangle(x, y, width, height);
};

var locationOf$1 = function locationOf(_ref3, rootDom) {
  var clientX = _ref3.clientX,
      clientY = _ref3.clientY;

  var _rootDom$getBoundingC = rootDom.getBoundingClientRect(),
      x = _rootDom$getBoundingC.x,
      y = _rootDom$getBoundingC.y;

  return regefGeometry.point(clientX - x, clientY - y);
};

var MultiSelectionCapability = function (_Capability) {
  inherits(MultiSelectionCapability, _Capability);

  function MultiSelectionCapability() {
    classCallCheck(this, MultiSelectionCapability);

    var _this = possibleConstructorReturn(this, (MultiSelectionCapability.__proto__ || Object.getPrototypeOf(MultiSelectionCapability)).call(this));

    _this.startLocation = null;
    _this.endLocation = null;
    _this.lastRequest = null;
    _this.additional = false;
    return _this;
  }

  createClass(MultiSelectionCapability, [{
    key: 'createMultiSelectionRequest',
    value: function createMultiSelectionRequest() {
      var startLocation = this.startLocation,
          endLocation = this.endLocation,
          additional = this.additional,
          engine = this.engine;
      var toolkit = this.engine.toolkit;

      var bounds = buildBounds(startLocation, endLocation);
      return {
        type: SELECT,
        bounds: bounds,
        startLocation: startLocation,
        endLocation: endLocation,
        get selection() {
          var selection = engine.selection();
          var additionalFilter = additional ? function (node) {
            return selection.indexOf(node) < 0;
          } : function () {
            return true;
          };
          // TODO this is not OK
          var partToolkit = toolkit.forDefaultPart();
          var newSelection = partToolkit.nodes().filter(additionalFilter).filter(function (node) {
            return bounds.containsRectangle(partToolkit.bounds(node));
          });
          return additional ? selection.concat(newSelection) : newSelection;
        }
      };
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
      }
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(e) {
      if (!this.engine.domHelper.isInsideDiagram(e.target)) {
        return;
      }
      var target = this.engine.domHelper.findClosest(e.target, ROOT_TYPE);
      if (target !== null) {
        this.startLocation = locationOf$1(e, this.engine.registry.root.dom);
        this.progress = true;
      }
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(e) {
      if (!this.progress) {
        return;
      }
      this.endLocation = locationOf$1(e, this.engine.registry.root.dom);
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
      this.endLocation = locationOf$1(e, this.engine.registry.root.dom);
      this.additional = e.shiftKey;
      var request = this.createMultiSelectionRequest();
      if (this.lastRequest !== null) {
        eraseFeedback(this.engine.editPolicies, this.lastRequest);
      }
      perform(this.engine.editPolicies, request);
      this.progress = false;
      this.additional = false;
    }
  }]);
  return MultiSelectionCapability;
}(Capability);

var CancelCapability = function (_Capability) {
  inherits(CancelCapability, _Capability);

  function CancelCapability() {
    classCallCheck(this, CancelCapability);
    return possibleConstructorReturn(this, (CancelCapability.__proto__ || Object.getPrototypeOf(CancelCapability)).apply(this, arguments));
  }

  createClass(CancelCapability, [{
    key: 'onKeyDown',
    value: function onKeyDown(_ref) {
      var key = _ref.key;

      if (key === 'Escape') {
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

  function DeleteCapability() {
    classCallCheck(this, DeleteCapability);

    var _this = possibleConstructorReturn(this, (DeleteCapability.__proto__ || Object.getPrototypeOf(DeleteCapability)).call(this));

    _this.currentSelection = [];
    return _this;
  }

  createClass(DeleteCapability, [{
    key: 'getDeleteRequest',
    value: function getDeleteRequest() {
      return {
        type: DELETE,
        selection: this.currentSelection
      };
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(_ref) {
      var key = _ref.key,
          target = _ref.target;

      if ((key === 'Backspace' || key === 'Delete') && this.engine.domHelper.isInsideDiagram(target)) {
        this.currentSelection = this.engine.selection();
        if (this.currentSelection.length > 0) {
          perform(this.engine.editPolicies, this.getDeleteRequest());
        }
      }
    }
  }]);
  return DeleteCapability;
}(Capability);

var ACCEPTED_TYPES$1 = [NODE_TYPE, ROOT_TYPE];

var buildOffset$1 = function buildOffset(_ref, element) {
  var clientX = _ref.clientX,
      clientY = _ref.clientY;

  var _element$getBoundingC = element.getBoundingClientRect(),
      x = _element$getBoundingC.x,
      y = _element$getBoundingC.y;

  return {
    x: clientX - x,
    y: clientY - y
  };
};

var CreationCapability = function (_Capability) {
  inherits(CreationCapability, _Capability);

  function CreationCapability() {
    classCallCheck(this, CreationCapability);

    var _this = possibleConstructorReturn(this, (CreationCapability.__proto__ || Object.getPrototypeOf(CreationCapability)).call(this));

    _this.target = null;
    _this.targetParent = null;
    _this.lastTargetParent = null;
    _this.coordinates = null;
    _this.offset = null;
    _this.lastRequest = null;
    _this.startLocation = null;
    return _this;
  }

  createClass(CreationCapability, [{
    key: 'findTargetedParent',
    value: function findTargetedParent(eventTarget) {
      return this.engine.domHelper.findClosest(eventTarget, ACCEPTED_TYPES$1);
    }
  }, {
    key: 'findTargetedCreator',
    value: function findTargetedCreator(eventTarget) {
      var parts = this.engine.parts;
      for (var i = 0, len = parts.length; i < len; i += 1) {
        var part = parts[i];
        var creator = part.domHelper.findClosest(eventTarget, CREATOR_TYPE);
        if (creator !== null) {
          return creator;
        }
      }
      return null;
    }
  }, {
    key: 'updateTargetParent',
    value: function updateTargetParent(e) {
      var newTargetParent = this.findTargetedParent(e.target);
      var targetParent = this.targetParent;
      if (targetParent !== newTargetParent) {
        this.lastTargetParent = targetParent;
        this.targetParent = newTargetParent;
      } else {
        this.lastTargetParent = targetParent;
      }
    }
  }, {
    key: 'updateCoordinates',
    value: function updateCoordinates(e) {
      var clientX = e.clientX,
          clientY = e.clientY;

      var screenLocation = regefGeometry.point(clientX, clientY);
      var offset = regefGeometry.point(this.offset);
      if (this.targetParent !== null) {
        var _engine$registry$root = this.engine.registry.root.dom.getBoundingClientRect(),
            rootX = _engine$registry$root.x,
            rootY = _engine$registry$root.y;

        this.coordinates = {
          offset: offset,
          location: regefGeometry.point(clientX - rootX, clientY - rootY),
          screenLocation: screenLocation
        };
      } else {
        this.coordinates = {
          offset: offset,
          location: null,
          screenLocation: screenLocation
        };
      }
    }
  }, {
    key: 'getCreateChildRequest',
    value: function getCreateChildRequest() {
      var targetParent = this.targetParent,
          coordinates = this.coordinates,
          target = this.target;
      var location = coordinates.location,
          offset = coordinates.offset,
          screenLocation = coordinates.screenLocation;

      return {
        type: CREATE,
        component: target.userComponent,
        targetContainer: targetParent === null ? null : targetParent.userComponent,
        screenLocation: screenLocation,
        location: location,
        offset: offset
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
    key: 'cleanupFeedback',
    value: function cleanupFeedback() {
      if (this.lastRequest !== null) {
        eraseFeedback(this.engine.editPolicies, this.lastRequest);
      }
    }
  }, {
    key: 'buildDragRequest',
    value: function buildDragRequest(e) {
      this.updateTargetParent(e);
      this.updateCoordinates(e);
      return this.getCreateChildRequest();
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      if (this.progress) {
        this.cleanupFeedback();
        this.progress = false;
        this.lastRequest = null;
        this.eventDeltas = null;
        this.coordinates = null;
        this.targetParent = null;
        this.target = null;
      }
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(e) {
      this.target = this.findTargetedCreator(e.target);
      if (this.target === null || this.target === undefined) {
        return;
      }
      this.startLocation = regefGeometry.point(e.clientX, e.clientY);
      this.offset = buildOffset$1(e, this.target.dom);
      this.progress = true;
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(e) {
      if (!this.progress) {
        return;
      }
      var request = this.buildDragRequest(e);
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
      this.cleanupFeedback();
      if (request !== null) {
        perform(this.engine.editPolicies, request);
      }
      this.progress = false;
    }
  }]);
  return CreationCapability;
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
exports.attachment = attachment;
exports.creator = creator;
exports.DragCapability = DragCapability;
exports.ConnectCapability = ConnectMouseHandler;
exports.SingleSelectionCapability = SingleSelectionCapability;
exports.MultiSelectionCapability = MultiSelectionCapability;
exports.CancelCapability = CancelCapability;
exports.DeleteCapability = DeleteCapability;
exports.CreationCapability = CreationCapability;
exports.ROOT_TYPE = ROOT_TYPE;
exports.NODE_TYPE = NODE_TYPE;
exports.PORT_TYPE = PORT_TYPE;
exports.CONNECTION_TYPE = CONNECTION_TYPE;
exports.ATTACHMENT_TYPE = ATTACHMENT_TYPE;
exports.CREATOR_TYPE = CREATOR_TYPE;
exports.ADD = ADD;
exports.CREATE = CREATE;
exports.MOVE = MOVE;
exports.SELECT = SELECT;
exports.DELETE = DELETE;
exports.START_CONNECTION = START_CONNECTION;
exports.END_CONNECTION = END_CONNECTION;
exports.DEFAULT_PART_ID = DEFAULT_PART_ID;
