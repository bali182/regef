'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var ReactDOM = _interopDefault(require('react-dom'));
var regefGeometry = require('regef-geometry');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

/** @internal */
var REGEF_PROP_KEY = '@@regef-internal-context@@';
(function (IntentType) {
    IntentType["ADD"] = "add";
    IntentType["MOVE"] = "move";
    IntentType["SELECT"] = "select";
    IntentType["DELETE"] = "delete";
    IntentType["START_CONNECTION"] = "start-connection";
    IntentType["END_CONNECTION"] = "end-connection";
})(exports.IntentType || (exports.IntentType = {}));

var RegefContext = React.createContext({
    id: null,
    engine: null,
});
function withRegefContext(Wrapped) {
    var WithRegefContext = /** @class */ (function (_super) {
        __extends(WithRegefContext, _super);
        function WithRegefContext() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WithRegefContext.prototype.render = function () {
            var _this = this;
            return (React.createElement(RegefContext.Consumer, null, function (context) {
                var _a;
                var allProps = __assign({}, _this.props, (_a = {}, _a[REGEF_PROP_KEY] = context, _a));
                return React.createElement(Wrapped, __assign({}, allProps));
            }));
        };
        return WithRegefContext;
    }(React.Component));
    return WithRegefContext;
}

var DiagramPart = /** @class */ (function (_super) {
    __extends(DiagramPart, _super);
    function DiagramPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DiagramPart.prototype.componentDidMount = function () {
        var engine = this.props.engine;
        if (!engine.eventManager.hooked) {
            engine.eventManager.hookListeners();
        }
    };
    DiagramPart.prototype.componentWillUnmount = function () {
        var _a = this.props, id = _a.id, engine = _a.engine;
        var part = engine.__parts.get(id);
        if (part && part.registry) {
            part.registry.setRoot(null);
        }
        engine.__parts.delete(id);
        if (engine.__parts.size === 0) {
            engine.eventManager.unhookListeners();
        }
    };
    DiagramPart.prototype.render = function () {
        var _a = this.props, id = _a.id, engine = _a.engine;
        return (React.createElement(RegefContext.Provider, { value: { id: id, engine: engine } }, this.props.children));
    };
    return DiagramPart;
}(React.PureComponent));

var EditPolicy = /** @class */ (function () {
    function EditPolicy() {
    }
    EditPolicy.prototype.perform = function (intent) { };
    EditPolicy.prototype.requestFeedback = function (intent) { };
    EditPolicy.prototype.eraseFeedback = function (intent) { };
    return EditPolicy;
}());

var DispatchingEditPolicy = /** @class */ (function (_super) {
    __extends(DispatchingEditPolicy, _super);
    function DispatchingEditPolicy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DispatchingEditPolicy.prototype.perform = function (intent) {
        var type = intent.type;
        switch (intent.type) {
            case exports.IntentType.ADD:
                return this.add(intent);
            case exports.IntentType.MOVE:
                return this.move(intent);
            case exports.IntentType.START_CONNECTION:
                return this.startConnection(intent);
            case exports.IntentType.END_CONNECTION:
                return this.endConnection(intent);
            case exports.IntentType.SELECT:
                return this.select(intent);
            case exports.IntentType.DELETE:
                return this.delete(intent);
            default:
                throw new Error("Unknown intent type " + type);
        }
    };
    DispatchingEditPolicy.prototype.requestFeedback = function (intent) {
        switch (intent.type) {
            case exports.IntentType.ADD:
                return this.requestAddFeedback(intent);
            case exports.IntentType.MOVE:
                return this.requestMoveFeedback(intent);
            case exports.IntentType.START_CONNECTION:
                return this.requestStartConnectionFeedback(intent);
            case exports.IntentType.END_CONNECTION:
                return this.requestEndConnectionFeedback(intent);
            case exports.IntentType.SELECT:
                return this.requestSelectFeedback(intent);
            default:
                throw new Error("Unknown intent type " + intent.type);
        }
    };
    DispatchingEditPolicy.prototype.eraseFeedback = function (intent) {
        switch (intent.type) {
            case exports.IntentType.ADD:
                return this.eraseAddFeedback(intent);
            case exports.IntentType.MOVE:
                return this.eraseMoveFeedback(intent);
            case exports.IntentType.START_CONNECTION:
                return this.eraseStartConnectionFeedback(intent);
            case exports.IntentType.END_CONNECTION:
                return this.eraseEndConnectionFeedback(intent);
            case exports.IntentType.SELECT:
                return this.eraseSelectFeedback(intent);
            default:
                throw new Error("Unknown intent type " + intent.type);
        }
    };
    DispatchingEditPolicy.prototype.add = function (intent) { };
    DispatchingEditPolicy.prototype.move = function (intent) { };
    DispatchingEditPolicy.prototype.startConnection = function (intent) { };
    DispatchingEditPolicy.prototype.endConnection = function (intent) { };
    DispatchingEditPolicy.prototype.select = function (intent) { };
    DispatchingEditPolicy.prototype.delete = function (intent) { };
    DispatchingEditPolicy.prototype.requestAddFeedback = function (intent) { };
    DispatchingEditPolicy.prototype.requestMoveFeedback = function (intent) { };
    DispatchingEditPolicy.prototype.requestStartConnectionFeedback = function (intent) { };
    DispatchingEditPolicy.prototype.requestEndConnectionFeedback = function (intent) { };
    DispatchingEditPolicy.prototype.requestSelectFeedback = function (intent) { };
    DispatchingEditPolicy.prototype.eraseAddFeedback = function (intent) { };
    DispatchingEditPolicy.prototype.eraseMoveFeedback = function (intent) { };
    DispatchingEditPolicy.prototype.eraseStartConnectionFeedback = function (intent) { };
    DispatchingEditPolicy.prototype.eraseEndConnectionFeedback = function (intent) { };
    DispatchingEditPolicy.prototype.eraseSelectFeedback = function (intent) { };
    return DispatchingEditPolicy;
}(EditPolicy));

var EventManager = /** @class */ (function () {
    function EventManager(engine) {
        this.engine = engine;
        this.hooked = false;
        // binding methods
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }
    EventManager.prototype.hookListeners = function () {
        var htmlDocument = this.engine.htmlDocument;
        htmlDocument.addEventListener('mousedown', this.onMouseDown);
        htmlDocument.addEventListener('mousemove', this.onMouseMove);
        htmlDocument.addEventListener('mouseup', this.onMouseUp);
        htmlDocument.addEventListener('keydown', this.onKeyDown);
        htmlDocument.addEventListener('keyup', this.onKeyUp);
        this.hooked = true;
    };
    EventManager.prototype.unhookListeners = function () {
        var htmlDocument = this.engine.htmlDocument;
        htmlDocument.removeEventListener('mousedown', this.onMouseDown);
        htmlDocument.removeEventListener('mousemove', this.onMouseMove);
        htmlDocument.removeEventListener('mouseup', this.onMouseUp);
        htmlDocument.removeEventListener('keydown', this.onKeyDown);
        htmlDocument.removeEventListener('keyup', this.onKeyUp);
        this.hooked = false;
    };
    EventManager.prototype.onKeyUp = function (e) {
        this.engine.capabilities.forEach(function (capability) { return capability.onKeyUp(e); });
    };
    EventManager.prototype.onKeyDown = function (e) {
        this.engine.capabilities.forEach(function (capability) { return capability.onKeyDown(e); });
    };
    EventManager.prototype.onMouseDown = function (e) {
        this.engine.capabilities.forEach(function (capability) { return capability.onMouseDown(e); });
    };
    EventManager.prototype.onMouseMove = function (e) {
        this.engine.capabilities.forEach(function (capability) { return capability.onMouseMove(e); });
    };
    EventManager.prototype.onMouseUp = function (e) {
        this.engine.capabilities.forEach(function (capability) { return capability.onMouseUp(e); });
    };
    return EventManager;
}());

var Toolkit = /** @class */ (function () {
    function Toolkit(engine) {
        this.engine = engine;
    }
    Toolkit.prototype.forPart = function (id) {
        var part = this.engine.part(id);
        if (part === null) {
            throw new Error("DiagramPart " + id + " hasn't been registered.");
        }
        return part ? part.toolkit : null;
    };
    Toolkit.prototype.forComponent = function (component) {
        var parts = this.engine.allParts();
        for (var i = 0, length_1 = parts.length; i < length_1; i += 1) {
            var part = parts[i];
            if (part && part.registry.has(component)) {
                return part.toolkit;
            }
        }
        throw new Error("Component " + component + " is not registered in any DiagramParts.");
    };
    return Toolkit;
}());

var DomHelper = /** @class */ (function () {
    function DomHelper(engine) {
        this.engine = engine;
    }
    DomHelper.prototype.findPart = function (dom, matcher) {
        if (matcher === void 0) { matcher = function () { return true; }; }
        var parts = this.engine.allParts();
        for (var i = 0; i < parts.length; i += 1) {
            var part = parts[i];
            if (part.domHelper.partContains(dom)) {
                return matcher(part) ? part : null;
            }
        }
        return null;
    };
    return DomHelper;
}());

var DEFAULT_ENGINE_CONFIG = {
    capabilities: [],
    editPolicies: [],
    selectionProvider: null,
    rootType: null,
    types: [],
    htmlDocument: document,
};
var Engine = /** @class */ (function () {
    function Engine(config) {
        if (config === void 0) { config = function () { return DEFAULT_ENGINE_CONFIG; }; }
        this.toolkit = null;
        this.eventManager = null;
        this.domHelper = null;
        this.capabilities = [];
        this.editPolicies = [];
        this.selectionProvider = null;
        this.types = [];
        this.rootType = null;
        this.htmlDocument = document;
        this.toolkit = new Toolkit(this);
        this.eventManager = new EventManager(this);
        this.domHelper = new DomHelper(this);
        this.__parts = new Map();
        var evaluatedConfig = __assign({}, DEFAULT_ENGINE_CONFIG, config(this));
        this.capabilities = evaluatedConfig.capabilities;
        this.editPolicies = evaluatedConfig.editPolicies;
        this.selectionProvider = evaluatedConfig.selectionProvider;
        this.types = evaluatedConfig.types;
        this.rootType = evaluatedConfig.rootType;
        this.htmlDocument = evaluatedConfig.htmlDocument || document;
    }
    Engine.prototype.part = function (id) {
        return this.__parts.get(id);
    };
    Engine.prototype.allParts = function () {
        return Array.from(this.__parts.values());
    };
    return Engine;
}());

var Capability = /** @class */ (function () {
    function Capability(engine, config) {
        this.progress = false;
        this.engine = engine;
        this.config = config;
    }
    Capability.prototype.onKeyDown = function (e) {
        // emtpy
    };
    Capability.prototype.onKeyUp = function (e) {
        // empty
    };
    Capability.prototype.onMouseDown = function (e) {
        // empty
    };
    Capability.prototype.onMouseMove = function (e) {
        // empty
    };
    Capability.prototype.onMouseUp = function (e) {
        // empty
    };
    Capability.prototype.cancel = function () {
        // empty
    };
    return Capability;
}());

var SelectionProvider = /** @class */ (function () {
    function SelectionProvider() {
    }
    SelectionProvider.prototype.selection = function () {
        return [];
    };
    return SelectionProvider;
}());

var ComponentWrapper = /** @class */ (function () {
    function ComponentWrapper(dom, component, userComponent) {
        this.dom = dom;
        this.component = component;
        this.userComponent = userComponent;
    }
    return ComponentWrapper;
}());
function fromComponent(component) {
    return new ComponentWrapper(ReactDOM.findDOMNode(component), component, component.userComponent);
}

var matches = function (target, wrapper) {
    var userComponent = wrapper.userComponent, dom = wrapper.dom, component = wrapper.component;
    return wrapper === target || userComponent === target || dom === target || component === target;
};
/** @internal */
var watchRegister = function (registry, target) {
    return new Promise(function (resolve, reject) {
        if (!registry || !target) {
            reject(new Error('registry or target was falsy value'));
            return;
        }
        if (registry.has(target)) {
            resolve();
            return;
        }
        var listener = function (wrapper) {
            if (wrapper && matches(target, wrapper)) {
                try {
                    resolve();
                }
                catch (e) {
                    reject(e);
                }
                finally {
                    registry.removeRegisterListener(listener);
                }
            }
        };
        registry.addRegisterListener(listener);
    });
};

var ComponentRegistry = /** @class */ (function () {
    function ComponentRegistry() {
        this.registerListeners = [];
        this.unregisterListeners = [];
        this.init();
    }
    ComponentRegistry.prototype.init = function () {
        this.mapping = new Map();
        this.wrappers = new Set();
        this.root = null;
        this.registerListeners = [];
        this.unregisterListeners = [];
    };
    ComponentRegistry.prototype.setRoot = function (root) {
        if (root && this.root) {
            throw new Error("Diagram can only contain a single root. " + this.root + " is already registered.");
        }
        if (root) {
            this.root = root;
        }
        else {
            this.init();
        }
    };
    ComponentRegistry.prototype.register = function (wrapper) {
        if (!(wrapper instanceof ComponentWrapper)) {
            throw new TypeError("ComponentWrapper instance expected, got " + wrapper);
        }
        this.mapping.set(wrapper, wrapper);
        this.mapping.set(wrapper.dom, wrapper);
        this.mapping.set(wrapper.component, wrapper);
        this.mapping.set(wrapper.userComponent, wrapper);
        this.wrappers.add(wrapper);
        this.registerListeners.forEach(function (listener) { return listener(wrapper); });
    };
    ComponentRegistry.prototype.unregister = function (input) {
        var wrapper = this.get(input);
        if (wrapper !== undefined) {
            this.mapping.delete(wrapper);
            this.mapping.delete(wrapper.dom);
            this.mapping.delete(wrapper.component);
            this.mapping.delete(wrapper.userComponent);
            this.wrappers.delete(wrapper);
            this.unregisterListeners.forEach(function (listener) { return listener(wrapper); });
        }
    };
    ComponentRegistry.prototype.get = function (input) {
        return this.mapping.get(input);
    };
    ComponentRegistry.prototype.all = function () {
        return Array.from(this.wrappers);
    };
    ComponentRegistry.prototype.has = function (input) {
        return this.mapping.has(input);
    };
    ComponentRegistry.prototype.addRegisterListener = function (listener) {
        this.registerListeners.push(listener);
    };
    ComponentRegistry.prototype.addUnregisterListener = function (listener) {
        this.unregisterListeners.push(listener);
    };
    ComponentRegistry.prototype.removeRegisterListener = function (listener) {
        this.registerListeners = this.registerListeners.filter(function (e) { return e !== listener; });
    };
    ComponentRegistry.prototype.removeUnregisterListener = function (listener) {
        this.unregisterListeners = this.unregisterListeners.filter(function (e) { return e !== listener; });
    };
    return ComponentRegistry;
}());

var PartToolkit = /** @class */ (function () {
    function PartToolkit(registry, domHelper) {
        this.registry = registry;
        this.domHelper = domHelper;
    }
    PartToolkit.prototype.root = function () {
        var root = this.registry.root;
        if (root === undefined || root === null) {
            throw new Error('No root component!');
        }
        return this.registry.root.userComponent;
    };
    PartToolkit.prototype.parent = function (component) {
        var domHelper = this.domHelper;
        var registry = this.registry;
        var wrapper = registry.get(component);
        if (wrapper === undefined || wrapper === null) {
            throw new Error('Given component is not part of the diagram!');
        }
        else if (wrapper === registry.root) {
            return null;
        }
        var parent = domHelper.findClosest(wrapper.dom.parentNode);
        return parent === null ? null : parent.userComponent;
    };
    PartToolkit.prototype.children = function (component) {
        var registry = this.registry;
        var domHelper = this.domHelper;
        var wrapper = registry.get(component);
        if (wrapper === undefined || wrapper === null) {
            throw new Error('Given component is not part of the diagram!');
        }
        var domChildren = domHelper.findRelevantChildren(wrapper.dom);
        var children = [];
        for (var i = 0, length_1 = domChildren.length; i < length_1; i += 1) {
            var child = registry.get(domChildren[i]);
            if (child !== undefined && child !== null) {
                children.push(child.userComponent);
            }
        }
        return children;
    };
    PartToolkit.prototype.ofType = function (type) {
        var all = this.registry.all();
        var ofType = [];
        for (var i = 0, length_2 = all.length; i < length_2; i += 1) {
            var wrapper = all[i];
            if (wrapper.component.type === type) {
                ofType.push(wrapper.userComponent);
            }
        }
        return ofType;
    };
    PartToolkit.prototype.bounds = function (component) {
        var registry = this.registry;
        var wrapper = registry.get(component);
        if (wrapper === undefined || wrapper === null) {
            throw new Error('Given component is not part of the diagram!');
        }
        var _a = wrapper.dom.getBoundingClientRect(), left = _a.left, top = _a.top, width = _a.width, height = _a.height;
        return regefGeometry.rectangle(left, top, width, height);
    };
    return PartToolkit;
}());

var PartDomHelper = /** @class */ (function () {
    function PartDomHelper(registry) {
        this.registry = registry;
    }
    PartDomHelper.prototype.findClosest = function (dom, matcher) {
        if (matcher === void 0) { matcher = function () { return true; }; }
        var root = this.registry.root.dom;
        for (var it_1 = dom; it_1 !== null; it_1 = it_1.parentNode) {
            var wrapper = this.registry.get(it_1);
            if (wrapper !== undefined && wrapper !== null) {
                return matcher(wrapper) ? wrapper : null;
            }
            if (it_1 === root) {
                return null;
            }
        }
        return null;
    };
    /** @internal */
    PartDomHelper.prototype.findRelevantChildrenIntenal = function (node, children) {
        if (children === void 0) { children = []; }
        if (node !== null && node.hasChildNodes()) {
            var childNodes = Array.from(node.childNodes);
            for (var i = 0, len = childNodes.length; i < len; i += 1) {
                var childNode = childNodes[i];
                if (this.registry.has(childNode)) {
                    children.push(childNode);
                }
                else {
                    this.findRelevantChildrenIntenal(childNode, children);
                }
            }
        }
    };
    PartDomHelper.prototype.findRelevantChildren = function (element) {
        var children = [];
        this.findRelevantChildrenIntenal(element, children);
        return children;
    };
    PartDomHelper.prototype.partContains = function (element) {
        return this.registry.root.dom.contains(element);
    };
    return PartDomHelper;
}());

var DiagramPartWrapper = /** @class */ (function () {
    function DiagramPartWrapper(id, engine) {
        this.id = id;
        this.engine = engine;
        this.registry = new ComponentRegistry();
        this.domHelper = new PartDomHelper(this.registry);
        this.toolkit = new PartToolkit(this.registry, this.domHelper);
    }
    return DiagramPartWrapper;
}());

/** @internal */
function registryFrom(_a) {
    var engine = _a.engine, id = _a.id;
    if (engine.__parts.has(id)) {
        return engine.part(id).registry;
    }
    return null;
}
/** @internal */
function toolkitFrom(_a) {
    var engine = _a.engine, id = _a.id;
    return engine.__parts.has(id) ? engine.toolkit : null;
}
/** @internal */
function ensurePartRegistered(_a) {
    var engine = _a.engine, id = _a.id;
    if (!engine.__parts.has(id)) {
        engine.__parts.set(id, new DiagramPartWrapper(id, engine));
    }
}
/** @internal */
function toolkitResolver(comp, context) {
    ensurePartRegistered(context);
    return function () { return watchRegister(registryFrom(context), comp).then(function () { return toolkitFrom(context); }); };
}
/** @internal */
function defaultActivate(comp, context) {
    ensurePartRegistered(context);
    registryFrom(context).register(fromComponent(comp));
}
/** @internal */
function defaultDecativate(comp, context) {
    var registry = registryFrom(context);
    if (registry) {
        registry.unregister(comp);
    }
}
/** @internal */
function rootActivate(comp, context) {
    defaultActivate(comp, context);
    var registry = registryFrom(context);
    registry.setRoot(registry.get(comp));
}
/** @internal */
function rootDeactivate(comp, context) {
    defaultDecativate(comp, context);
    var registry = registryFrom(context);
    if (registry) {
        registry.setRoot(null);
    }
}
/** @internal */
function getEngine(comp) {
    return comp.props[REGEF_PROP_KEY].engine;
}
function component(type) {
    return function componentDecorator(Wrapped) {
        var DecoratedComponent = /** @class */ (function (_super) {
            __extends(DecoratedComponent, _super);
            function DecoratedComponent(props) {
                var _this = _super.call(this, props) || this;
                _this.setUserComponent = function (ref) {
                    _this.userComponent = ref;
                };
                var context = _this.getRegefContext();
                _this.userComponent = null;
                _this.type = type;
                _this.childProps = { toolkit: toolkitResolver(_this, context) };
                var types = context.engine.types;
                if (types.indexOf(type) < 0) {
                    var typesStr = types.map(function (tpe) { return "\"" + tpe + "\""; }).join(',');
                    throw new TypeError("Not a valid component type \"" + type + "\". Please select one from " + typesStr + ", or add \"" + type + "\" to the engine's \"types\" array.");
                }
                return _this;
            }
            DecoratedComponent.prototype.componentDidMount = function () {
                var engine = getEngine(this);
                if (this.type === engine.rootType) {
                    rootActivate(this, this.getRegefContext());
                }
                else {
                    defaultActivate(this, this.getRegefContext());
                }
            };
            DecoratedComponent.prototype.componentWillUnmount = function () {
                var engine = getEngine(this);
                if (this.type === engine.rootType) {
                    rootDeactivate(this, this.getRegefContext());
                }
                else {
                    defaultDecativate(this, this.getRegefContext());
                }
            };
            DecoratedComponent.prototype.getRegefContext = function () {
                return this.props[REGEF_PROP_KEY];
            };
            DecoratedComponent.prototype.render = function () {
                var _a = this.props, children = _a.children, rest = __rest(_a, ["children"]);
                return (React.createElement(Wrapped, __assign({}, rest, { ref: this.setUserComponent, regef: this.childProps }), children));
            };
            return DecoratedComponent;
        }(React.PureComponent));
        return withRegefContext(DecoratedComponent);
    };
}

function matchesSingleType(type) {
    return function (_a) {
        var component = _a.component;
        return component.type === type;
    };
}
function matchesMultiTypes(types) {
    return function (_a) {
        var component = _a.component;
        return types.indexOf(component.type) >= 0;
    };
}
function matchesSinglePart(partId) {
    return function (part) { return part.id === partId; };
}
function matchesMultiParts(partIds) {
    return function (part) { return partIds.indexOf(part.id) >= 0; };
}
function alwaysTrue() {
    return true;
}
function getSelection(engine) {
    if (engine && engine.selectionProvider instanceof SelectionProvider) {
        return engine.selectionProvider.selection();
    }
    return [];
}
function typeMatches(types) {
    if (types === null || types === undefined) {
        return alwaysTrue;
    }
    else if (Array.isArray(types)) {
        return matchesMultiTypes(types);
    }
    return matchesSingleType(types);
}
function partMatches(ids) {
    if (ids === null || ids === undefined) {
        return alwaysTrue;
    }
    else if (Array.isArray(ids)) {
        return matchesMultiParts(ids);
    }
    return matchesSinglePart(ids);
}
function onEachPolicy(callback) {
    return function (policies, intent) {
        if (Array.isArray(policies) && intent && intent.type) {
            for (var i = 0; i < policies.length; i += 1) {
                callback(policies[i], intent);
            }
        }
    };
}
var perform = onEachPolicy(function (policy, intent) { return policy.perform(intent); });
var requestFeedback = onEachPolicy(function (policy, intent) { return policy.requestFeedback(intent); });
var eraseFeedback = onEachPolicy(function (policy, intent) { return policy.eraseFeedback(intent); });
function getParts(engine, ids) {
    if (ids === void 0) { ids = null; }
    if (ids === null || ids === undefined) {
        return engine.allParts();
    }
    return ids.map(function (id) { return engine.part(id); });
}
// https://stackoverflow.com/a/12737882/1126273
function isLeftButton(e) {
    if ('buttons' in e) {
        return e.buttons === 1;
    }
    else if ('which' in e) {
        return e.which === 1;
    }
    return e.button === 1;
}

function buildOffset(_a, element) {
    var clientX = _a.clientX, clientY = _a.clientY;
    var _b = element.getBoundingClientRect(), left = _b.left, top = _b.top;
    return regefGeometry.point(clientX - left, clientY - top);
}
var DEFAULT_CONFIG = {
    parts: null,
    draggables: [],
    hosts: [],
};
var DragCapability = /** @class */ (function (_super) {
    __extends(DragCapability, _super);
    function DragCapability(engine, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, engine, __assign({}, DEFAULT_CONFIG, config)) || this;
        _this.init();
        return _this;
    }
    DragCapability.prototype.init = function () {
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
    };
    DragCapability.prototype.findTargetedParent = function (eventTarget, part) {
        var _this = this;
        var _a = this, target = _a.target, currentParent = _a.currentParent;
        if (!part) {
            return null;
        }
        var newTarget = part.domHelper.findClosest(eventTarget, typeMatches(this.config.hosts));
        if (newTarget === null ||
            newTarget === target ||
            (target !== null && target.dom.contains(newTarget.dom))) {
            return currentParent;
        }
        var selection = getSelection(this.engine);
        var affectedParts = selection.map(function (comp) { return _this.engine.toolkit.forComponent(comp); });
        if (new Set(affectedParts).size !== 1) {
            return newTarget;
        }
        var affectedParents = selection.map(function (comp, i) { return affectedParts[i].parent(comp); });
        if (new Set(affectedParents).size !== 1) {
            return newTarget;
        }
        var targets = [newTarget.userComponent, target.userComponent];
        if (targets.every(function (userComponent) { return selection.indexOf(userComponent) >= 0; })) {
            return currentParent;
        }
        return newTarget;
    };
    DragCapability.prototype.deltaCoordinates = function (_a) {
        var clientX = _a.clientX, clientY = _a.clientY;
        return regefGeometry.point(clientX - this.startLocation.x, clientY - this.startLocation.y);
    };
    DragCapability.prototype.offsetCoordinates = function () {
        return this.offset;
    };
    DragCapability.prototype.locationCoordinates = function (_a) {
        var clientX = _a.clientX, clientY = _a.clientY;
        return regefGeometry.point(clientX, clientY);
    };
    DragCapability.prototype.updateCoordinates = function (e) {
        this.coordinates = {
            offset: this.offsetCoordinates(),
            delta: this.deltaCoordinates(e),
            location: this.locationCoordinates(e),
        };
    };
    DragCapability.prototype.updateParents = function (e, part) {
        var newTargetParent = this.findTargetedParent(e.target, part);
        var targetParent = this.targetParent;
        if (targetParent !== newTargetParent) {
            this.lastTargetParent = targetParent;
            this.targetParent = newTargetParent;
        }
        else {
            this.lastTargetParent = targetParent;
        }
    };
    DragCapability.prototype.getMovedComponents = function () {
        var target = this.target.userComponent;
        var selection = getSelection(this.engine);
        if (selection.indexOf(target) >= 0) {
            return selection;
        }
        return [target];
    };
    DragCapability.prototype.getMoveChildRequest = function () {
        return __assign({ type: exports.IntentType.MOVE, components: this.getMovedComponents(), container: this.currentParent.component.userComponent }, this.coordinates);
    };
    DragCapability.prototype.getAddChildRequest = function () {
        var _a = this, targetParent = _a.targetParent, currentParent = _a.currentParent;
        return __assign({ type: exports.IntentType.ADD, components: this.getMovedComponents(), targetContainer: targetParent === null ? null : targetParent.component.userComponent, container: currentParent.component.userComponent }, this.coordinates);
    };
    DragCapability.prototype.getSelectionRequest = function () {
        var _a = this, startLocation = _a.startLocation, target = _a.target;
        return {
            type: exports.IntentType.SELECT,
            bounds: regefGeometry.rectangle(startLocation, regefGeometry.dimension(0, 0)),
            startLocation: startLocation,
            endLocation: startLocation,
            selection: [target.userComponent],
        };
    };
    DragCapability.prototype.handleFeedback = function (lastRequest, request) {
        var _a = this, lastTargetParent = _a.lastTargetParent, targetParent = _a.targetParent;
        if (lastRequest !== null && lastTargetParent !== targetParent) {
            eraseFeedback(this.engine.editPolicies, lastRequest);
        }
        if (request !== null) {
            requestFeedback(this.engine.editPolicies, request);
        }
    };
    DragCapability.prototype.buildDragRequest = function (e) {
        var part = this.engine.domHelper.findPart(e.target, partMatches(this.config.parts));
        this.updateParents(e, part);
        this.updateCoordinates(e);
        var _a = this, currentParent = _a.currentParent, targetParent = _a.targetParent;
        if (currentParent === targetParent) {
            return this.getMoveChildRequest();
        }
        else if (currentParent !== targetParent) {
            return this.getAddChildRequest();
        }
        return null;
    };
    DragCapability.prototype.cancel = function () {
        if (this.progress) {
            if (this.lastRequest !== null && this.targetParent !== null) {
                eraseFeedback(this.engine.editPolicies, this.lastRequest);
            }
            this.init();
        }
    };
    DragCapability.prototype.onMouseDown = function (e) {
        var _this = this;
        if (!isLeftButton(e)) {
            return;
        }
        var part = this.engine.domHelper.findPart(e.target, partMatches(this.config.parts));
        if (!part) {
            return;
        }
        this.target = part.domHelper.findClosest(e.target, typeMatches(this.config.draggables));
        if (this.target !== null) {
            var parent_1 = part.domHelper.findClosest(this.target.dom.parentNode, function (wrapper) { return _this.config.hosts.indexOf(wrapper.component.type) >= 0; });
            this.currentParent = parent_1 || part.registry.root;
            this.offset = buildOffset(e, this.target.dom);
            this.startLocation = regefGeometry.point(e.clientX, e.clientY);
            this.mouseMoved = false;
            this.progress = true;
        }
    };
    DragCapability.prototype.onMouseMove = function (e) {
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
    };
    DragCapability.prototype.onMouseUp = function (e) {
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
    };
    return DragCapability;
}(Capability));

var DEFAULT_CONFIG$1 = {
    parts: null,
    sourceTypes: [],
    targetTypes: [],
};
var ConnectCapability = /** @class */ (function (_super) {
    __extends(ConnectCapability, _super);
    function ConnectCapability(engine, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, engine, __assign({}, DEFAULT_CONFIG$1, config)) || this;
        _this.init();
        return _this;
    }
    ConnectCapability.prototype.init = function () {
        this.progress = false;
        this.source = null;
        this.target = null;
        this.coordinates = null;
        this.lastRequest = null;
    };
    ConnectCapability.prototype.cancel = function () {
        if (this.progress) {
            if (this.lastRequest !== null) {
                eraseFeedback(this.engine.editPolicies, this.lastRequest);
            }
            this.init();
        }
    };
    ConnectCapability.prototype.getStartConnectionRequest = function () {
        return {
            type: exports.IntentType.START_CONNECTION,
            source: this.source.userComponent,
            location: regefGeometry.point(this.coordinates),
        };
    };
    ConnectCapability.prototype.getEndConnectionRequest = function () {
        return {
            type: exports.IntentType.END_CONNECTION,
            source: this.source.userComponent,
            target: this.target.userComponent,
            location: regefGeometry.point(this.coordinates),
        };
    };
    ConnectCapability.prototype.buildEndConnectRequest = function (e) {
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
    };
    ConnectCapability.prototype.buildStartConnectionRequest = function (e) {
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
    };
    ConnectCapability.prototype.handleFeedback = function (lastRequest, request) {
        if (lastRequest !== null &&
            (request === null ||
                request.target !== lastRequest.target)) {
            eraseFeedback(this.engine.editPolicies, lastRequest);
        }
        if (request !== null) {
            requestFeedback(this.engine.editPolicies, request);
        }
    };
    ConnectCapability.prototype.onMouseDown = function (e) {
        if (!isLeftButton(e)) {
            return;
        }
        var request = this.buildStartConnectionRequest(e);
        if (request !== null) {
            this.progress = true;
        }
        this.handleFeedback(this.lastRequest, request);
        this.lastRequest = request;
    };
    ConnectCapability.prototype.onMouseMove = function (e) {
        if (!this.progress) {
            return;
        }
        var request = this.buildEndConnectRequest(e);
        this.handleFeedback(this.lastRequest, request);
        this.lastRequest = request;
    };
    ConnectCapability.prototype.onMouseUp = function (e) {
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
    };
    return ConnectCapability;
}(Capability));

var locationOf = function (_a, rootDom) {
    var clientX = _a.clientX, clientY = _a.clientY;
    var _b = rootDom.getBoundingClientRect(), top = _b.top, left = _b.left;
    return regefGeometry.point(clientX - left, clientY - top);
};
var DEFAULT_CONFIG$2 = {
    parts: null,
    selectables: [],
};
var SingleSelectionCapability = /** @class */ (function (_super) {
    __extends(SingleSelectionCapability, _super);
    function SingleSelectionCapability(engine, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, engine, __assign({}, DEFAULT_CONFIG$2, config)) || this;
        _this.init();
        return _this;
    }
    SingleSelectionCapability.prototype.init = function () {
        this.progress = false;
        this.location = null;
        this.possibleSingleSelection = false;
        this.additional = false;
        this.selection = [];
    };
    SingleSelectionCapability.prototype.createSingleSelectionRequest = function () {
        var _a = this, location = _a.location, selection = _a.selection, additional = _a.additional;
        return {
            type: exports.IntentType.SELECT,
            bounds: regefGeometry.rectangle(location, regefGeometry.dimension(0, 0)),
            selection: additional ? getSelection(this.engine).concat(selection) : selection,
            startLocation: location,
            endLocation: location,
        };
    };
    SingleSelectionCapability.prototype.cancel = function () {
        if (this.progress) {
            this.init();
        }
    };
    SingleSelectionCapability.prototype.onMouseDown = function (e) {
        if (!isLeftButton(e)) {
            return;
        }
        var part = this.engine.domHelper.findPart(e.target, partMatches(this.config.parts));
        if (!part) {
            return;
        }
        var target = part.domHelper.findClosest(e.target, typeMatches(this.config.selectables));
        if (!target) {
            return;
        }
        this.location = locationOf(e, part.registry.root.dom);
        this.selection = [target.userComponent];
        this.possibleSingleSelection = true;
        this.progress = true;
    };
    SingleSelectionCapability.prototype.onMouseMove = function () {
        this.possibleSingleSelection = false;
    };
    SingleSelectionCapability.prototype.onMouseUp = function (_a) {
        var ctrlKey = _a.ctrlKey, metaKey = _a.metaKey;
        if (!this.progress) {
            return;
        }
        if (this.possibleSingleSelection) {
            this.additional = metaKey || ctrlKey;
            perform(this.engine.editPolicies, this.createSingleSelectionRequest());
            this.additional = false;
        }
        this.init();
    };
    return SingleSelectionCapability;
}(Capability));

var locationOf$1 = function (_a) {
    var clientX = _a.clientX, clientY = _a.clientY;
    return regefGeometry.point(clientX, clientY);
};
var DEFAULT_CONFIG$3 = {
    parts: null,
    selectables: [],
    intersection: false,
    containment: true,
};
var MultiSelectionCapability = /** @class */ (function (_super) {
    __extends(MultiSelectionCapability, _super);
    function MultiSelectionCapability(engine, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, engine, __assign({}, DEFAULT_CONFIG$3, config)) || this;
        _this.init();
        return _this;
    }
    MultiSelectionCapability.prototype.init = function () {
        this.progress = false;
        this.startLocation = null;
        this.endLocation = null;
        this.lastRequest = null;
        this.selectionBounds = null;
        this.selection = null;
        this.additional = false;
    };
    MultiSelectionCapability.prototype.createMultiSelectionRequest = function () {
        var _a = this, startLocation = _a.startLocation, endLocation = _a.endLocation, selectionBounds = _a.selectionBounds, selection = _a.selection;
        return {
            type: exports.IntentType.SELECT,
            bounds: selectionBounds,
            selection: selection || [],
            startLocation: startLocation,
            endLocation: endLocation,
        };
    };
    MultiSelectionCapability.prototype.buildSelectionBounds = function () {
        var _a = this, startLocation = _a.startLocation, endLocation = _a.endLocation;
        if (!startLocation || !endLocation) {
            return;
        }
        var x1 = startLocation.x, y1 = startLocation.y;
        var x2 = endLocation.x, y2 = endLocation.y;
        var x = Math.min(x1, x2);
        var y = Math.min(y1, y2);
        var width = Math.max(x1, x2) - x;
        var height = Math.max(y1, y2) - y;
        this.selectionBounds = regefGeometry.rectangle(x, y, width, height);
    };
    MultiSelectionCapability.prototype.buildSelection = function () {
        var _a = this, config = _a.config, engine = _a.engine, selectionBounds = _a.selectionBounds, additional = _a.additional;
        var parts = getParts(engine, config.parts).filter(function (part) {
            var _a = part.registry.root.dom.getBoundingClientRect(), top = _a.top, left = _a.left, width = _a.width, height = _a.height;
            var bounds = regefGeometry.rectangle(left, top, width, height);
            return bounds.intersection(selectionBounds) !== null;
        });
        var currentSelection = getSelection(engine);
        var newSelection = [];
        var isRelevant = typeMatches(config.selectables);
        var additionalFilter = additional
            ? function (_a) {
                var userComponent = _a.userComponent;
                return currentSelection.indexOf(userComponent) < 0;
            }
            : alwaysTrue;
        var boundsMatch = config.containment
            ? function (itemBounds) { return selectionBounds.containsRectangle(itemBounds); }
            : function (itemBounds) { return selectionBounds.intersection(itemBounds) !== null; };
        parts.forEach(function (part) {
            part.registry.all().forEach(function (wrapper) {
                var _a = wrapper.dom.getBoundingClientRect(), top = _a.top, left = _a.left, width = _a.width, height = _a.height;
                var bounds = regefGeometry.rectangle(left, top, width, height);
                if (isRelevant(wrapper) && additionalFilter(wrapper) && boundsMatch(bounds)) {
                    newSelection.push(wrapper.userComponent);
                }
            });
        });
        this.selection = additional ? currentSelection.concat(newSelection) : newSelection;
    };
    MultiSelectionCapability.prototype.cancel = function () {
        if (this.progress) {
            if (this.lastRequest !== null) {
                eraseFeedback(this.engine.editPolicies, this.lastRequest);
            }
            this.startLocation = null;
            this.endLocation = null;
            this.progress = false;
            this.selection = null;
            this.selectionBounds = null;
        }
    };
    MultiSelectionCapability.prototype.onMouseDown = function (e) {
        if (!isLeftButton(e)) {
            return;
        }
        var part = this.engine.domHelper.findPart(e.target, partMatches(this.config.parts));
        if (!part) {
            return;
        }
        var target = part.domHelper.findClosest(e.target, typeMatches(this.engine.rootType));
        if (target !== null) {
            this.startLocation = locationOf$1(e);
            this.progress = true;
        }
    };
    MultiSelectionCapability.prototype.onMouseMove = function (e) {
        if (!this.progress) {
            return;
        }
        this.endLocation = locationOf$1(e);
        this.additional = Boolean(e.shiftKey);
        this.buildSelectionBounds();
        this.buildSelection();
        var request = this.createMultiSelectionRequest();
        requestFeedback(this.engine.editPolicies, request);
        this.lastRequest = request;
    };
    MultiSelectionCapability.prototype.onMouseUp = function (e) {
        if (!this.progress) {
            return;
        }
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
    };
    return MultiSelectionCapability;
}(Capability));

var DEFAULT_CONFIG$4 = {
    parts: null,
    keys: ['Escape'],
};
var CancelCapability = /** @class */ (function (_super) {
    __extends(CancelCapability, _super);
    function CancelCapability(engine, config) {
        if (config === void 0) { config = {}; }
        return _super.call(this, engine, __assign({}, DEFAULT_CONFIG$4, config)) || this;
    }
    /** @internal */
    CancelCapability.prototype.focusOnTargetedParts = function (target) {
        return Boolean(this.engine.domHelper.findPart(target, partMatches(this.config.parts)));
    };
    CancelCapability.prototype.keyMatches = function (key) {
        return this.config.keys.indexOf(key) >= 0;
    };
    CancelCapability.prototype.onKeyDown = function (_a) {
        var key = _a.key, target = _a.target;
        if (this.keyMatches(key) && this.focusOnTargetedParts(target)) {
            this.engine.capabilities.forEach(function (capability) { return capability.cancel(); });
        }
    };
    return CancelCapability;
}(Capability));

var DEFAULT_CONFIG$5 = {
    parts: null,
    keys: ['Backspace', 'Delete'],
};
var DeleteCapability = /** @class */ (function (_super) {
    __extends(DeleteCapability, _super);
    function DeleteCapability(engine, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, engine, __assign({}, DEFAULT_CONFIG$5, config)) || this;
        _this.currentSelection = null;
        _this.init();
        return _this;
    }
    DeleteCapability.prototype.init = function () {
        this.currentSelection = [];
        this.progress = false;
    };
    DeleteCapability.prototype.getDeleteRequest = function () {
        return {
            type: exports.IntentType.DELETE,
            selection: this.currentSelection,
        };
    };
    DeleteCapability.prototype.focusOnTargetedParts = function (target) {
        return Boolean(this.engine.domHelper.findPart(target, partMatches(this.config.parts)));
    };
    DeleteCapability.prototype.keyMatches = function (key) {
        return this.config.keys.indexOf(key) >= 0;
    };
    DeleteCapability.prototype.onKeyDown = function (_a) {
        var key = _a.key, target = _a.target;
        if (this.keyMatches(key) && this.focusOnTargetedParts(target)) {
            this.currentSelection = getSelection(this.engine);
            if (this.currentSelection.length > 0) {
                perform(this.engine.editPolicies, this.getDeleteRequest());
            }
        }
        this.init();
    };
    return DeleteCapability;
}(Capability));

exports.DiagramPart = DiagramPart;
exports.EditPolicy = EditPolicy;
exports.DispatchingEditPolicy = DispatchingEditPolicy;
exports.Engine = Engine;
exports.Capability = Capability;
exports.SelectionProvider = SelectionProvider;
exports.component = component;
exports.DragCapability = DragCapability;
exports.ConnectCapability = ConnectCapability;
exports.SingleSelectionCapability = SingleSelectionCapability;
exports.MultiSelectionCapability = MultiSelectionCapability;
exports.CancelCapability = CancelCapability;
exports.DeleteCapability = DeleteCapability;
exports.Toolkit = Toolkit;
exports.PartToolkit = PartToolkit;
exports.REGEF_PROP_KEY = REGEF_PROP_KEY;
//# sourceMappingURL=index.js.map
