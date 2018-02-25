'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var reactDom = require('react-dom');
var regefGeometry = require('regef-geometry');
var React = require('react');
var React__default = _interopDefault(React);

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

var defineEnumerableProperties = function (obj, descs) {
  for (var key in descs) {
    var desc = descs[key];
    desc.configurable = desc.enumerable = true;
    if ("value" in desc) desc.writable = true;
    Object.defineProperty(obj, key, desc);
  }

  return obj;
};

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

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
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
      this.root = root;
      if (root === null || root === undefined) {
        this.mapping.clear();
      }
    }
  }, {
    key: 'register',
    value: function register(wrapper) {
      if (!(wrapper instanceof ComponentWrapper)) {
        throw new TypeError('ComponentWrapper instance expected, got ' + wrapper);
      }
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
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var root = this.registry.root.dom;
      for (var it = dom; it !== null; it = it.parentNode) {
        var wrapper = this.registry.get(it);
        if (wrapper !== undefined && wrapper !== null) {
          return this.matchesType(wrapper.component, type) ? wrapper : null;
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
    key: "matchesType",
    value: function matchesType(component, type) {
      if (component === null) {
        return false;
      }
      if (type === null) {
        return true;
      }
      if (Array.isArray(type)) {
        for (var i = 0, len = type.length; i < len; i += 1) {
          var it = type[i];
          if (it === component.type) {
            return true;
          }
        }
      }
      return type === component.type;
    }
  }]);
  return DomHelper;
}();

// Data attribute keys
var DATA_ID = 'data-regef-id';

// Diagram participant types
var ROOT_TYPE = 'root';
var NODE_TYPE = 'node';
var PORT_TYPE = 'port';
var CONNECTION_TYPE = 'connection';

// Request types
var SELECT = 'select';
var MOVE = 'move';
var DELETE = 'delete';
var MOVE_CHILDREN = 'move-children';
var ADD_CHILDREN = 'add-children';
var START_CONNECTION = 'start-connection';
var END_CONNECTION = 'end-connection';

// Request hidden target key
var COMMAND_TARGET = Symbol('command-target');

var REGISTRY = Symbol('registry');
var DOM_HELPER = Symbol('dom-helper');

var Toolkit = function () {
  function Toolkit(registry) {
    classCallCheck(this, Toolkit);

    this[REGISTRY] = registry;
    this[DOM_HELPER] = new DomHelper(registry);
  }

  createClass(Toolkit, [{
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
  return Toolkit;
}();

var has = function has(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
};

function bind(target, key, descriptor) {
  var fn = descriptor.value;
  var definingProperty = false;

  return {
    configurable: true,
    get: function get() {
      if (definingProperty || this === target.prototype || has(this, key) || typeof fn !== 'function') {
        return fn;
      }
      var boundFn = fn.bind(this);
      definingProperty = true;
      Object.defineProperty(this, key, {
        configurable: true,
        get: function get() {
          return boundFn;
        },
        set: function set(value) {
          fn = value;
          delete this[key];
        }
      });
      definingProperty = false;
      return boundFn;
    },
    set: function set(value) {
      fn = value;
    }
  };
}

var _class;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var Diagram = (_class = function (_React$Component) {
  inherits(Diagram, _React$Component);

  function Diagram(props, context) {
    classCallCheck(this, Diagram);

    var _this = possibleConstructorReturn(this, (Diagram.__proto__ || Object.getPrototypeOf(Diagram)).call(this, props, context));

    _this.registry = new ComponentRegistry();
    _this.toolkit = new Toolkit(_this.registry);
    return _this;
  }

  createClass(Diagram, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var engine = this.props.engine;

      if (engine) {
        engine.setToolkit(this.toolkit);
        engine.setComponentRegistry(this.registry);
      }

      document.addEventListener('mousedown', this.onMouseDown);
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
      document.addEventListener('keydown', this.onKeyDown);
      document.addEventListener('keyup', this.onKeyUp);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var newEngine = _ref.engine;
      var currentEngine = this.props.engine;

      if (newEngine !== currentEngine) {
        newEngine.setToolkit(this.toolkit);
        newEngine.setComponentRegistry(this.registry);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('mousedown', this.onMouseDown);
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
      document.removeEventListener('keydown', this.onKeyDown);
      document.removeEventListener('keyup', this.onKeyUp);

      if (this.registry.root !== null) {
        this.registry.setRoot(null);
      }
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      this.props.engine.onKeyDown(e);
    }
  }, {
    key: 'onKeyUp',
    value: function onKeyUp(e) {
      this.props.engine.onKeyUp(e);
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(e) {
      this.props.engine.onMouseDown(e);
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(e) {
      this.props.engine.onMouseMove(e);
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp(e) {
      this.props.engine.onMouseUp(e);
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        regef: {
          registry: this.registry,
          idGenerator: this.idGenerator,
          toolkit: this.toolkit
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      // TODO check if it's node a root node, which is difficult because of other decorators
      return React.Children.only(this.props.children);
    }
  }]);
  return Diagram;
}(React__default.Component), _applyDecoratedDescriptor(_class.prototype, 'onKeyDown', [bind], Object.getOwnPropertyDescriptor(_class.prototype, 'onKeyDown'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onKeyUp', [bind], Object.getOwnPropertyDescriptor(_class.prototype, 'onKeyUp'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onMouseDown', [bind], Object.getOwnPropertyDescriptor(_class.prototype, 'onMouseDown'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onMouseMove', [bind], Object.getOwnPropertyDescriptor(_class.prototype, 'onMouseMove'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onMouseUp', [bind], Object.getOwnPropertyDescriptor(_class.prototype, 'onMouseUp'), _class.prototype), _class);


Diagram.childContextTypes = {
  regef: function regef() {
    return null;
  }
};

var EditPolicy = function () {
  function EditPolicy() {
    classCallCheck(this, EditPolicy);

    this.host = null;
    this.toolkit = null;
  }

  createClass(EditPolicy, [{
    key: "perform",
    value: function perform() /* request */{}
  }, {
    key: "requestFeedback",
    value: function requestFeedback() /* request */{}
  }, {
    key: "eraseFeedback",
    value: function eraseFeedback() /* request */{}
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
        case ADD_CHILDREN:
          return this.addChildren(request);
        case MOVE_CHILDREN:
          return this.moveChildren(request);
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
        case ADD_CHILDREN:
          return this.requestAddChildrenFeedback(request);
        case MOVE_CHILDREN:
          return this.requestMoveChildrenFeedback(request);
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
        case ADD_CHILDREN:
          return this.eraseAddChildrenFeedback(request);
        case MOVE_CHILDREN:
          return this.eraseMoveChildrenFeedback(request);
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
    key: 'addChildren',
    value: function addChildren() /* request */{}
  }, {
    key: 'moveChildren',
    value: function moveChildren() /* request */{}
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
    key: 'requestAddChildrenFeedback',
    value: function requestAddChildrenFeedback() /* request */{}
  }, {
    key: 'requestMoveChildrenFeedback',
    value: function requestMoveChildrenFeedback() /* request */{}
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
    key: 'eraseAddChildrenFeedback',
    value: function eraseAddChildrenFeedback() /* request */{}
  }, {
    key: 'eraseMoveChildrenFeedback',
    value: function eraseMoveChildrenFeedback() /* request */{}
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

var SelectionProvider = function () {
  function SelectionProvider() {
    classCallCheck(this, SelectionProvider);

    this.toolkit = null;
  }

  createClass(SelectionProvider, [{
    key: "setToolkit",
    value: function setToolkit(toolkit) {
      this.toolkit = toolkit;
    }
  }, {
    key: "selection",
    value: function selection() {
      return [];
    }
  }]);
  return SelectionProvider;
}();

var Engine = function () {
  function Engine(_ref) {
    var _ref$mouseHandlers = _ref.mouseHandlers,
        mouseHandlers = _ref$mouseHandlers === undefined ? [] : _ref$mouseHandlers,
        _ref$keyHandlers = _ref.keyHandlers,
        keyHandlers = _ref$keyHandlers === undefined ? [] : _ref$keyHandlers,
        _ref$selectionProvide = _ref.selectionProvider,
        selectionProvider = _ref$selectionProvide === undefined ? new SelectionProvider() : _ref$selectionProvide;
    classCallCheck(this, Engine);

    this.toolkit = null;
    this.registry = null;
    this.mouseHandlers = mouseHandlers;
    this.keyHandlers = keyHandlers;
    this.selectionProvider = selectionProvider;
  }

  createClass(Engine, [{
    key: 'setToolkit',
    value: function setToolkit(toolkit) {
      this.toolkit = toolkit;
    }
  }, {
    key: 'getComponentRegistry',
    value: function getComponentRegistry() {
      return this.registry;
    }
  }, {
    key: 'setComponentRegistry',
    value: function setComponentRegistry(registry) {
      var _this = this;

      this.registry = registry;
      this.mouseHandlers.forEach(function (tracker) {
        tracker.setComponentRegistry(registry);
        tracker.setEngine(_this);
      });
      this.keyHandlers.forEach(function (handler) {
        handler.setComponentRegistry(registry);
        handler.setEngine(_this);
      });
      if (this.selectionProvider instanceof SelectionProvider) {
        this.selectionProvider.setToolkit(this.toolkit);
      }
    }
  }, {
    key: 'onKeyUp',
    value: function onKeyUp(e) {
      this.keyHandlers.forEach(function (handler) {
        return handler.onKeyUp(e);
      });
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      this.keyHandlers.forEach(function (handler) {
        return handler.onKeyDown(e);
      });
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(e) {
      this.mouseHandlers.forEach(function (tracker) {
        return tracker.onMouseDown(e);
      });
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(e) {
      this.mouseHandlers.forEach(function (tracker) {
        return tracker.onMouseMove(e);
      });
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp(e) {
      this.mouseHandlers.forEach(function (tracker) {
        return tracker.onMouseUp(e);
      });
    }
  }, {
    key: 'selection',
    value: function selection() {
      if (!(this.selectionProvider instanceof SelectionProvider)) {
        return [];
      }
      return this.selectionProvider.selection();
    }
  }]);
  return Engine;
}();

var KeyHandler = function () {
  function KeyHandler() {
    classCallCheck(this, KeyHandler);
  }

  createClass(KeyHandler, [{
    key: 'setEngine',
    value: function setEngine() {
      throw new TypeError('not implemented');
    }
  }, {
    key: 'setComponentRegistry',
    value: function setComponentRegistry() {
      throw new TypeError('not implemented');
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      throw new TypeError('not implemented');
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown() {
      throw new TypeError('not implemented');
    }
  }, {
    key: 'onKeyUp',
    value: function onKeyUp() {
      throw new TypeError('not implemented');
    }
  }]);
  return KeyHandler;
}();

var MouseHandler = function () {
  function MouseHandler() {
    classCallCheck(this, MouseHandler);
  }

  createClass(MouseHandler, [{
    key: 'setEngine',
    value: function setEngine() {
      throw new TypeError('not implemented');
    }
  }, {
    key: 'setComponentRegistry',
    value: function setComponentRegistry() {
      throw new TypeError('not implemented');
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      throw new TypeError('not implemented');
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown() {
      throw new TypeError('not implemented');
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove() {
      throw new TypeError('not implemented');
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp() {
      throw new TypeError('not implemented');
    }
  }]);
  return MouseHandler;
}();

var BaseMouseHandler = function (_MouseHandler) {
  inherits(BaseMouseHandler, _MouseHandler);

  function BaseMouseHandler() {
    classCallCheck(this, BaseMouseHandler);

    var _this = possibleConstructorReturn(this, (BaseMouseHandler.__proto__ || Object.getPrototypeOf(BaseMouseHandler)).call(this));

    _this.engine = null;
    _this.progress = false;
    _this.registry = null;
    _this.domHelper = null;
    return _this;
  }

  createClass(BaseMouseHandler, [{
    key: 'setEngine',
    value: function setEngine(engine) {
      this.engine = engine;
    }
  }, {
    key: 'setComponentRegistry',
    value: function setComponentRegistry(registry) {
      this.registry = registry;
      this.domHelper = registry === null ? null : new DomHelper(registry);
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown() {
      // empty
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove() {
      // empty
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp() {
      // empty
    }
  }]);
  return BaseMouseHandler;
}(MouseHandler);

var ACCEPTED_TYPES = [NODE_TYPE, ROOT_TYPE];

var buildDeltas = function buildDeltas(_ref, element) {
  var clientX = _ref.clientX,
      clientY = _ref.clientY;

  var _element$getBoundingC = element.getBoundingClientRect(),
      x = _element$getBoundingC.x,
      y = _element$getBoundingC.y;

  var deltaX = clientX - x;
  var deltaY = clientY - y;
  return {
    deltaX: deltaX,
    deltaY: deltaY
  };
};

var DragMouseHandler = function (_BaseMouseHandler) {
  inherits(DragMouseHandler, _BaseMouseHandler);

  function DragMouseHandler() {
    classCallCheck(this, DragMouseHandler);

    var _this = possibleConstructorReturn(this, (DragMouseHandler.__proto__ || Object.getPrototypeOf(DragMouseHandler)).call(this));

    _this.target = null;
    _this.lastTargetParent = null;
    _this.targetParent = null;
    _this.currentParent = null;
    _this.coordinates = null;
    _this.eventDeltas = null;
    _this.lastRequest = null;
    _this.mouseMoved = false;
    _this.startLocation = null;
    return _this;
  }

  createClass(DragMouseHandler, [{
    key: 'findTargetedParent',
    value: function findTargetedParent(eventTarget) {
      var domHelper = this.domHelper,
          target = this.target,
          currentParent = this.currentParent;

      var newTarget = domHelper.findClosest(eventTarget, ACCEPTED_TYPES);
      if (newTarget === null || newTarget === target || target.dom.contains(newTarget.dom) || this.engine.selection().indexOf(newTarget.userComponent) >= 0) {
        return currentParent;
      }
      return newTarget;
    }
  }, {
    key: 'updateCoordinates',
    value: function updateCoordinates(e) {
      var _eventDeltas = this.eventDeltas,
          deltaX = _eventDeltas.deltaX,
          deltaY = _eventDeltas.deltaY;
      var clientX = e.clientX,
          clientY = e.clientY;

      var _registry$root$dom$ge = this.registry.root.dom.getBoundingClientRect(),
          rootX = _registry$root$dom$ge.x,
          rootY = _registry$root$dom$ge.y;

      var location = regefGeometry.point(clientX - rootX, clientY - rootY);
      var offset = regefGeometry.point(deltaX, deltaY);
      var delta = regefGeometry.point(e.clientX - this.startLocation.x, e.clientY - this.startLocation.y);
      this.coordinates = {
        location: location,
        offset: offset,
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
      var _ref2;

      var currentParent = this.currentParent,
          coordinates = this.coordinates;
      var location = coordinates.location,
          offset = coordinates.offset,
          delta = coordinates.delta;

      return _ref2 = {}, defineProperty(_ref2, COMMAND_TARGET, currentParent.component), defineProperty(_ref2, 'type', MOVE_CHILDREN), defineProperty(_ref2, 'components', this.getMovedComponents()), defineProperty(_ref2, 'container', currentParent.component.userComponent), defineProperty(_ref2, 'location', location), defineProperty(_ref2, 'offset', offset), defineProperty(_ref2, 'delta', delta), _ref2;
    }
  }, {
    key: 'getAddChildRequest',
    value: function getAddChildRequest() {
      var _ref3;

      var targetParent = this.targetParent,
          currentParent = this.currentParent,
          coordinates = this.coordinates;
      var location = coordinates.location,
          offset = coordinates.offset,
          delta = coordinates.delta;

      return _ref3 = {}, defineProperty(_ref3, COMMAND_TARGET, targetParent.component), defineProperty(_ref3, 'type', ADD_CHILDREN), defineProperty(_ref3, 'components', this.getMovedComponents()), defineProperty(_ref3, 'targetContainer', targetParent.component.userComponent), defineProperty(_ref3, 'container', currentParent.component.userComponent), defineProperty(_ref3, 'location', location), defineProperty(_ref3, 'offset', offset), defineProperty(_ref3, 'delta', delta), _ref3;
    }
  }, {
    key: 'getSelectionRequest',
    value: function getSelectionRequest() {
      var _ref4;

      var startLocation = this.startLocation,
          target = this.target;

      return _ref4 = {}, defineProperty(_ref4, COMMAND_TARGET, this.registry.root.component), defineProperty(_ref4, 'type', SELECT), defineProperty(_ref4, 'bounds', regefGeometry.rectangle(startLocation, regefGeometry.dimension(0, 0))), defineProperty(_ref4, 'startLocation', startLocation), defineProperty(_ref4, 'endLocation', startLocation), defineProperty(_ref4, 'selection', [target.userComponent]), _ref4;
    }
  }, {
    key: 'handleFeedback',
    value: function handleFeedback(lastRequest, request) {
      var lastTargetParent = this.lastTargetParent,
          targetParent = this.targetParent;

      if (lastRequest !== null && lastTargetParent.dom !== targetParent.dom && lastTargetParent.component !== null) {
        lastTargetParent.component.eraseFeedback(lastRequest);
      }
      if (request !== null) {
        targetParent.component.requestFeedback(request);
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
      if (!this.domHelper.isInsideDiagram(e.target)) {
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
          this.targetParent.component.eraseFeedback(this.lastRequest);
        }
        this.progress = false;
        this.lastRequest = null;
        this.eventDeltas = null;
        this.coordinates = null;
        this.targetParent = null;
        this.target = null;
        this.currentParent = null;
      }
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(e) {
      if (!this.domHelper.isInsideDiagram(e.target)) {
        return;
      }
      this.target = this.domHelper.findClosest(e.target, NODE_TYPE);
      if (this.target !== null) {
        var parent = this.domHelper.findClosest(this.target.dom.parentNode, ACCEPTED_TYPES);
        this.currentParent = parent || this.registry.root;
        this.eventDeltas = buildDeltas(e, this.target.dom);
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
        var selectionReq = this.getSelectionRequest();
        selectionReq[COMMAND_TARGET].perform(selectionReq);
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
        this.targetParent.component.eraseFeedback(this.lastRequest);
      }
      if (request !== null && request[COMMAND_TARGET] && this.mouseMoved) {
        request[COMMAND_TARGET].perform(request);
      }
      this.progress = false;
    }
  }]);
  return DragMouseHandler;
}(BaseMouseHandler);

var ConnectMouseHandler = function (_BaseMouseHandler) {
  inherits(ConnectMouseHandler, _BaseMouseHandler);

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
          this.lastRequest[COMMAND_TARGET].eraseFeedback(this.lastRequest);
        }
        this.source = null;
        this.target = null;
        this.progress = false;
      }
    }
  }, {
    key: 'getStartConnectionRequest',
    value: function getStartConnectionRequest() {
      var _ref;

      return _ref = {}, defineProperty(_ref, COMMAND_TARGET, this.source.component), defineProperty(_ref, 'type', START_CONNECTION), defineProperty(_ref, 'source', this.source.component.userComponent), defineProperty(_ref, 'location', regefGeometry.point(this.coordinates)), _ref;
    }
  }, {
    key: 'getEndConnectionRequest',
    value: function getEndConnectionRequest() {
      var _ref2;

      return _ref2 = {}, defineProperty(_ref2, COMMAND_TARGET, this.target.component), defineProperty(_ref2, 'type', END_CONNECTION), defineProperty(_ref2, 'source', this.source.component.userComponent), defineProperty(_ref2, 'target', this.target.component.userComponent), defineProperty(_ref2, 'location', regefGeometry.point(this.coordinates)), _ref2;
    }
  }, {
    key: 'buildCoordinates',
    value: function buildCoordinates(_ref3) {
      var clientX = _ref3.clientX,
          clientY = _ref3.clientY;

      var _registry$root$dom$ge = this.registry.root.dom.getBoundingClientRect(),
          top = _registry$root$dom$ge.top,
          left = _registry$root$dom$ge.left;

      var x = clientX - left;
      var y = clientY - top;
      return { x: x, y: y };
    }
  }, {
    key: 'buildEndConnectRequest',
    value: function buildEndConnectRequest(e) {
      if (!this.domHelper.isInsideDiagram(e.target)) {
        return null;
      }

      this.target = this.domHelper.findClosest(e.target);
      this.coordinates = this.buildCoordinates(e);
      return this.getEndConnectionRequest();
    }
  }, {
    key: 'buildStartConnectionRequest',
    value: function buildStartConnectionRequest(e) {
      if (!this.domHelper.isInsideDiagram(e.target)) {
        return null;
      }
      var source = this.domHelper.findClosest(e.target, PORT_TYPE);
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
      if (lastRequest !== null && (request === null || request[COMMAND_TARGET] !== lastRequest[COMMAND_TARGET])) {
        lastRequest[COMMAND_TARGET].eraseFeedback(lastRequest);
      }
      if (request !== null) {
        request[COMMAND_TARGET].requestFeedback(request);
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
      if (this.lastRequest !== null && this.lastRequest[COMMAND_TARGET] !== null) {
        this.lastRequest[COMMAND_TARGET].eraseFeedback(this.lastRequest);
      }
      if (request !== null && request[COMMAND_TARGET]) {
        request[COMMAND_TARGET].perform(request);
      }
      this.progress = false;
    }
  }]);
  return ConnectMouseHandler;
}(BaseMouseHandler);

var locationOf = function locationOf(_ref, rootDom) {
  var clientX = _ref.clientX,
      clientY = _ref.clientY;

  var _rootDom$getBoundingC = rootDom.getBoundingClientRect(),
      x = _rootDom$getBoundingC.x,
      y = _rootDom$getBoundingC.y;

  return regefGeometry.point(clientX - x, clientY - y);
};

var SingleSelectionMouseHandler = function (_BaseMouseHandler) {
  inherits(SingleSelectionMouseHandler, _BaseMouseHandler);

  function SingleSelectionMouseHandler() {
    classCallCheck(this, SingleSelectionMouseHandler);

    var _this = possibleConstructorReturn(this, (SingleSelectionMouseHandler.__proto__ || Object.getPrototypeOf(SingleSelectionMouseHandler)).call(this));

    _this.startLocation = null;
    _this.endLocation = null;
    _this.possibleSingleSelection = false;
    _this.additional = false;
    _this.selection = [];
    return _this;
  }

  createClass(SingleSelectionMouseHandler, [{
    key: 'createSingleSelectionRequest',
    value: function createSingleSelectionRequest() {
      var _ref2;

      var startLocation = this.startLocation,
          endLocation = this.endLocation,
          selection = this.selection,
          additional = this.additional;

      return _ref2 = {}, defineProperty(_ref2, COMMAND_TARGET, this.registry.root.component), defineProperty(_ref2, 'type', SELECT), defineProperty(_ref2, 'bounds', regefGeometry.rectangle(startLocation, regefGeometry.dimension(0, 0))), defineProperty(_ref2, 'startLocation', startLocation), defineProperty(_ref2, 'endLocation', endLocation), defineProperty(_ref2, 'selection', additional ? this.engine.selection().concat(selection) : selection), _ref2;
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
      if (!this.domHelper.isInsideDiagram(e.target)) {
        return;
      }
      var target = this.domHelper.findClosest(e.target, NODE_TYPE);
      if (target !== null) {
        this.startLocation = locationOf(e, this.registry.root.dom);
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
    value: function onMouseUp(_ref3) {
      var ctrlKey = _ref3.ctrlKey,
          metaKey = _ref3.metaKey;

      if (!this.progress) {
        return;
      }
      this.endLocation = this.startLocation;
      if (this.possibleSingleSelection) {
        this.additional = metaKey || ctrlKey;
        var request = this.createSingleSelectionRequest();
        request[COMMAND_TARGET].perform(request);
        this.additional = false;
      }
    }
  }]);
  return SingleSelectionMouseHandler;
}(BaseMouseHandler);

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

var MultiSelectionDragTracker = function (_BaseMouseHandler) {
  inherits(MultiSelectionDragTracker, _BaseMouseHandler);

  function MultiSelectionDragTracker() {
    classCallCheck(this, MultiSelectionDragTracker);

    var _this = possibleConstructorReturn(this, (MultiSelectionDragTracker.__proto__ || Object.getPrototypeOf(MultiSelectionDragTracker)).call(this));

    _this.startLocation = null;
    _this.endLocation = null;
    _this.lastRequest = null;
    _this.toolkit = null;
    _this.additional = false;
    return _this;
  }

  createClass(MultiSelectionDragTracker, [{
    key: 'setComponentRegistry',
    value: function setComponentRegistry(registry) {
      get(MultiSelectionDragTracker.prototype.__proto__ || Object.getPrototypeOf(MultiSelectionDragTracker.prototype), 'setComponentRegistry', this).call(this, registry);
      this.toolkit = registry === null ? null : new Toolkit(registry);
    }
  }, {
    key: 'createMultiSelectionRequest',
    value: function createMultiSelectionRequest() {
      var _selection, _ref4, _mutatorMap;

      var startLocation = this.startLocation,
          endLocation = this.endLocation,
          toolkit = this.toolkit,
          additional = this.additional,
          engine = this.engine;

      var bounds = buildBounds(startLocation, endLocation);
      return _ref4 = {}, defineProperty(_ref4, COMMAND_TARGET, this.registry.root.component), defineProperty(_ref4, 'type', SELECT), defineProperty(_ref4, 'bounds', bounds), defineProperty(_ref4, 'startLocation', startLocation), defineProperty(_ref4, 'endLocation', endLocation), _selection = 'selection', _mutatorMap = {}, _mutatorMap[_selection] = _mutatorMap[_selection] || {}, _mutatorMap[_selection].get = function () {
        var selection = engine.selection();
        var additionalFilter = additional ? function (node) {
          return selection.indexOf(node) < 0;
        } : function () {
          return true;
        };
        var newSelection = toolkit.nodes().filter(additionalFilter).filter(function (node) {
          return bounds.containsRectangle(toolkit.bounds(node));
        });
        return additional ? selection.concat(newSelection) : newSelection;
      }, defineEnumerableProperties(_ref4, _mutatorMap), _ref4;
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      if (this.progress) {
        if (this.lastRequest !== null) {
          this.lastRequest[COMMAND_TARGET].eraseFeedback(this.lastRequest);
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
      if (!this.domHelper.isInsideDiagram(e.target)) {
        return;
      }
      var target = this.domHelper.findClosest(e.target, ROOT_TYPE);
      if (target !== null) {
        this.startLocation = locationOf$1(e, this.registry.root.dom);
        this.progress = true;
      }
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(e) {
      if (!this.progress) {
        return;
      }
      this.endLocation = locationOf$1(e, this.registry.root.dom);
      var request = this.createMultiSelectionRequest();
      request[COMMAND_TARGET].requestFeedback(request);
      this.lastRequest = request;
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp(e) {
      if (!this.progress) {
        return;
      }
      this.endLocation = locationOf$1(e, this.registry.root.dom);
      this.additional = e.shiftKey;
      var request = this.createMultiSelectionRequest();
      if (this.lastRequest !== null) {
        this.lastRequest[COMMAND_TARGET].eraseFeedback(this.lastRequest);
      }
      request[COMMAND_TARGET].perform(request);
      this.progress = false;
      this.additional = false;
    }
  }]);
  return MultiSelectionDragTracker;
}(BaseMouseHandler);

var BaseKeyHandler = function (_KeyHandler) {
  inherits(BaseKeyHandler, _KeyHandler);

  function BaseKeyHandler() {
    classCallCheck(this, BaseKeyHandler);

    var _this = possibleConstructorReturn(this, (BaseKeyHandler.__proto__ || Object.getPrototypeOf(BaseKeyHandler)).call(this));

    _this.engine = null;
    _this.progress = false;
    _this.registry = null;
    _this.domHelper = null;
    return _this;
  }

  createClass(BaseKeyHandler, [{
    key: 'setEngine',
    value: function setEngine(engine) {
      this.engine = engine;
    }
  }, {
    key: 'setComponentRegistry',
    value: function setComponentRegistry(registry) {
      this.registry = registry;
      this.domHelper = registry === null ? null : new DomHelper(registry);
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown() {
      // emtpy
    }
  }, {
    key: 'onKeyUp',
    value: function onKeyUp() {
      // empty
    }
  }]);
  return BaseKeyHandler;
}(KeyHandler);

var CancelMouseHandlersKeyHandler = function (_BaseKeyHandler) {
  inherits(CancelMouseHandlersKeyHandler, _BaseKeyHandler);

  function CancelMouseHandlersKeyHandler() {
    classCallCheck(this, CancelMouseHandlersKeyHandler);
    return possibleConstructorReturn(this, (CancelMouseHandlersKeyHandler.__proto__ || Object.getPrototypeOf(CancelMouseHandlersKeyHandler)).apply(this, arguments));
  }

  createClass(CancelMouseHandlersKeyHandler, [{
    key: 'onKeyDown',
    value: function onKeyDown(_ref) {
      var key = _ref.key;

      if (key === 'Escape') {
        this.engine.mouseHandlers.forEach(function (tracker) {
          return tracker.cancel();
        });
      }
    }
  }]);
  return CancelMouseHandlersKeyHandler;
}(BaseKeyHandler);

var DeleteKeyHandler = function (_BaseKeyHandler) {
  inherits(DeleteKeyHandler, _BaseKeyHandler);

  function DeleteKeyHandler() {
    classCallCheck(this, DeleteKeyHandler);

    var _this = possibleConstructorReturn(this, (DeleteKeyHandler.__proto__ || Object.getPrototypeOf(DeleteKeyHandler)).call(this));

    _this.currentSelection = [];
    return _this;
  }

  createClass(DeleteKeyHandler, [{
    key: 'getDeleteRequest',
    value: function getDeleteRequest() {
      var _ref;

      return _ref = {}, defineProperty(_ref, COMMAND_TARGET, this.registry.root.component), defineProperty(_ref, 'type', DELETE), defineProperty(_ref, 'selection', this.currentSelection), _ref;
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(_ref2) {
      var key = _ref2.key,
          target = _ref2.target;

      if ((key === 'Backspace' || key === 'Delete') && this.domHelper.isInsideDiagram(target)) {
        this.currentSelection = this.engine.selection();
        if (this.currentSelection.length > 0) {
          var request = this.getDeleteRequest();
          request[COMMAND_TARGET].perform(request);
        }
      }
    }
  }]);
  return DeleteKeyHandler;
}(BaseKeyHandler);

var TOOLKIT = Symbol('TOOLKIT');
var COMPONENT$1 = Symbol('COMPONENT');

var CompositeEditPolicy = function (_EditPolicy) {
  inherits(CompositeEditPolicy, _EditPolicy);

  function CompositeEditPolicy() {
    var policies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    classCallCheck(this, CompositeEditPolicy);

    var _this = possibleConstructorReturn(this, (CompositeEditPolicy.__proto__ || Object.getPrototypeOf(CompositeEditPolicy)).call(this));

    _this.policies = policies;
    _this[TOOLKIT] = null;
    _this[COMPONENT$1] = null;
    return _this;
  }

  createClass(CompositeEditPolicy, [{
    key: 'perform',
    value: function perform(request) {
      for (var i = 0, len = this.policies.length; i < len; i += 1) {
        var policy = this.policies[i];
        policy.perform(request);
      }
    }
  }, {
    key: 'requestFeedback',
    value: function requestFeedback(request) {
      for (var i = 0, len = this.policies.length; i < len; i += 1) {
        var policy = this.policies[i];
        policy.requestFeedback(request);
      }
    }
  }, {
    key: 'eraseFeedback',
    value: function eraseFeedback(request) {
      for (var i = 0, len = this.policies.length; i < len; i += 1) {
        var policy = this.policies[i];
        policy.eraseFeedback(request);
      }
    }
  }, {
    key: 'toolkit',
    get: function get$$1() {
      return this[TOOLKIT];
    },
    set: function set$$1(toolkit) {
      this._toolkit = toolkit;
      if (this.policies === null || this.policies === undefined) {
        return;
      }
      for (var i = 0, len = this.policies.length; i < len; i += 1) {
        var policy = this.policies[i];
        policy.toolkit = toolkit;
      }
    }
  }, {
    key: 'host',
    get: function get$$1() {
      return this[COMPONENT$1];
    },
    set: function set$$1(component) {
      this._component = component;
      if (this.policies === null || this.policies === undefined) {
        return;
      }
      for (var i = 0, len = this.policies.length; i < len; i += 1) {
        var policy = this.policies[i];
        policy.component = component;
      }
    }
  }]);
  return CompositeEditPolicy;
}(EditPolicy);


var compose = function compose() {
  for (var _len = arguments.length, Policies = Array(_len), _key = 0; _key < _len; _key++) {
    Policies[_key] = arguments[_key];
  }

  var CustomizedCompositeEditPolicy = function (_CompositeEditPolicy) {
    inherits(CustomizedCompositeEditPolicy, _CompositeEditPolicy);

    function CustomizedCompositeEditPolicy() {
      classCallCheck(this, CustomizedCompositeEditPolicy);
      return possibleConstructorReturn(this, (CustomizedCompositeEditPolicy.__proto__ || Object.getPrototypeOf(CustomizedCompositeEditPolicy)).call(this, Policies.map(function (Policy) {
        return new Policy();
      })));
    }

    return CustomizedCompositeEditPolicy;
  }(CompositeEditPolicy);

  return CustomizedCompositeEditPolicy;
};

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

function _applyDecoratedDescriptor$1(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var defaultMergeProps = function defaultMergeProps(regef) {
  return { regef: regef };
};

var toolkitResolver = function toolkitResolver(component, registry, toolkit) {
  return function () {
    return watchRegister(registry, component).then(function () {
      return toolkit;
    });
  };
};

var createDecorator = function createDecorator(_ref) {
  var type = _ref.type,
      activate = _ref.activate,
      deactivate = _ref.deactivate;
  return function () {
    var Policy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EditPolicy;
    var mergeProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultMergeProps;
    return function (Wrapped) {
      var _class;

      var DecoratedComponent = (_class = function (_React$Component) {
        inherits(DecoratedComponent, _React$Component);

        function DecoratedComponent(props, context) {
          classCallCheck(this, DecoratedComponent);

          var _this = possibleConstructorReturn(this, (DecoratedComponent.__proto__ || Object.getPrototypeOf(DecoratedComponent)).call(this, props, context));

          var _context$regef = context.regef,
              registry = _context$regef.registry,
              toolkit = _context$regef.toolkit;

          _this.registry = registry;
          _this.toolkit = toolkit;
          _this.editPolicy = new Policy();
          _this.userComponent = null;
          _this.type = type;
          _this.childProps = { toolkit: toolkitResolver(_this, registry, toolkit) };
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
            activate(this);
          }
        }, {
          key: 'componentWillUnmount',
          value: function componentWillUnmount() {
            deactivate(this);
          }
        }, {
          key: 'perform',
          value: function perform(request) {
            return this.editPolicy.perform(request);
          }
        }, {
          key: 'requestFeedback',
          value: function requestFeedback(request) {
            return this.editPolicy.requestFeedback(request);
          }
        }, {
          key: 'eraseFeedback',
          value: function eraseFeedback(request) {
            return this.editPolicy.eraseFeedback(request);
          }
        }, {
          key: 'render',
          value: function render() {
            var _props = this.props,
                children = _props.children,
                rest = objectWithoutProperties(_props, ['children']);

            var regefProps = mergeProps(this.childProps);
            return React__default.createElement(
              Wrapped,
              _extends({}, rest, { ref: this.setUserComponent }, regefProps),
              children
            );
          }
        }]);
        return DecoratedComponent;
      }(React__default.Component), _applyDecoratedDescriptor$1(_class.prototype, 'setUserComponent', [bind], Object.getOwnPropertyDescriptor(_class.prototype, 'setUserComponent'), _class.prototype), _class);


      DecoratedComponent.contextTypes = {
        regef: function regef() {
          return null;
        }
      };

      return DecoratedComponent;
    };
  };
};

/* eslint-disable no-param-reassign */
var defaultActivate = function defaultActivate(component) {
  var wrapper = fromComponent(component);
  component.registry.register(wrapper);
  component.editPolicy.component = component.userComponent;
  component.editPolicy.toolkit = component.toolkit;
};

var defaultDecativate = function defaultDecativate(component) {
  component.registry.unregister(component);
  component.editPolicy.component = null;
  component.editPolicy.toolkit = null;
};

var rootActivate = function rootActivate(component) {
  defaultActivate(component);
  component.registry.setRoot(component.registry.get(component));
};

var rootDeactivate = function rootDeactivate(component) {
  defaultDecativate(component);
  component.registry.setRoot(null);
};

var node = createDecorator({
  type: NODE_TYPE,
  activate: defaultActivate,
  deactivate: defaultDecativate
});

var port = createDecorator({
  type: PORT_TYPE,
  activate: defaultActivate,
  deactivate: defaultDecativate
});

var root = createDecorator({
  type: ROOT_TYPE,
  activate: rootActivate,
  deactivate: rootDeactivate
});

var connection = createDecorator({
  type: CONNECTION_TYPE,
  activate: defaultActivate,
  deactivate: defaultDecativate
});

exports.Diagram = Diagram;
exports.EditPolicy = EditPolicy;
exports.DispatchingEditPolicy = DispatchingEditPolicy;
exports.Engine = Engine;
exports.KeyHandler = KeyHandler;
exports.MouseHandler = MouseHandler;
exports.DragMouseHandler = DragMouseHandler;
exports.ConnectMouseHandler = ConnectMouseHandler;
exports.SingleSelectionMouseHandler = SingleSelectionMouseHandler;
exports.MultiSelectionMouseHandler = MultiSelectionDragTracker;
exports.CancelMouseHandlersKeyHandler = CancelMouseHandlersKeyHandler;
exports.DeleteKeyHandler = DeleteKeyHandler;
exports.SelectionProvider = SelectionProvider;
exports.compose = compose;
exports.root = root;
exports.connection = connection;
exports.node = node;
exports.port = port;
exports.DATA_ID = DATA_ID;
exports.ROOT_TYPE = ROOT_TYPE;
exports.NODE_TYPE = NODE_TYPE;
exports.PORT_TYPE = PORT_TYPE;
exports.CONNECTION_TYPE = CONNECTION_TYPE;
exports.SELECT = SELECT;
exports.MOVE = MOVE;
exports.DELETE = DELETE;
exports.MOVE_CHILDREN = MOVE_CHILDREN;
exports.ADD_CHILDREN = ADD_CHILDREN;
exports.START_CONNECTION = START_CONNECTION;
exports.END_CONNECTION = END_CONNECTION;
exports.COMMAND_TARGET = COMMAND_TARGET;
