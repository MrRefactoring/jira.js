"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsPlugin = void 0;
const components_1 = require("../components");
const events_1 = require("../events");
const fs_1 = require("../../utils/fs");
const DefaultTheme_1 = require("../themes/default/DefaultTheme");
const highlighter_1 = require("../../utils/highlighter");
const utils_1 = require("../../utils");
const fs_2 = require("fs");
const path_1 = require("path");
/**
 * A plugin that copies the subdirectory ´assets´ from the current themes
 * source folder to the output directory.
 */
let AssetsPlugin = (() => {
    var _AssetsPlugin_customCss_accessor_storage;
    let _classDecorators = [(0, components_1.Component)({ name: "assets" })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = components_1.RendererComponent;
    let _instanceExtraInitializers = [];
    let _customCss_decorators;
    let _customCss_initializers = [];
    var AssetsPlugin = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            _AssetsPlugin_customCss_accessor_storage.set(this, (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _customCss_initializers, void 0)));
        }
        /** @internal */
        get customCss() { return __classPrivateFieldGet(this, _AssetsPlugin_customCss_accessor_storage, "f"); }
        set customCss(value) { __classPrivateFieldSet(this, _AssetsPlugin_customCss_accessor_storage, value, "f"); }
        /**
         * Create a new AssetsPlugin instance.
         */
        initialize() {
            this.listenTo(this.owner, {
                [events_1.RendererEvent.END]: this.onRenderEnd,
                [events_1.RendererEvent.BEGIN]: (event) => {
                    const dest = (0, path_1.join)(event.outputDirectory, "assets");
                    if (this.customCss) {
                        if ((0, fs_2.existsSync)(this.customCss)) {
                            (0, fs_1.copySync)(this.customCss, (0, path_1.join)(dest, "custom.css"));
                        }
                        else {
                            this.application.logger.error(`Custom CSS file at ${this.customCss} does not exist.`);
                            event.preventDefault();
                        }
                    }
                },
            });
        }
        /**
         * Triggered before the renderer starts rendering a project.
         *
         * @param event  An event object describing the current render operation.
         */
        onRenderEnd(event) {
            if (this.owner.theme instanceof DefaultTheme_1.DefaultTheme) {
                const src = (0, path_1.join)(__dirname, "..", "..", "..", "..", "static");
                const dest = (0, path_1.join)(event.outputDirectory, "assets");
                (0, fs_1.copySync)(src, dest);
                (0, fs_1.writeFileSync)((0, path_1.join)(dest, "highlight.css"), (0, highlighter_1.getStyles)());
            }
        }
    };
    _AssetsPlugin_customCss_accessor_storage = new WeakMap();
    __setFunctionName(_classThis, "AssetsPlugin");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        _customCss_decorators = [(0, utils_1.Option)("customCss")];
        __esDecorate(_classThis, null, _customCss_decorators, { kind: "accessor", name: "customCss", static: false, private: false, access: { has: obj => "customCss" in obj, get: obj => obj.customCss, set: (obj, value) => { obj.customCss = value; } }, metadata: _metadata }, _customCss_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AssetsPlugin = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AssetsPlugin = _classThis;
})();
exports.AssetsPlugin = AssetsPlugin;
