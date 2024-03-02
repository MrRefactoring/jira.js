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
exports.LinkResolverPlugin = void 0;
const components_1 = require("../components");
const converter_events_1 = require("../converter-events");
const utils_1 = require("../../utils");
const models_1 = require("../../models");
const reflections_1 = require("../../utils/reflections");
const application_events_1 = require("../../application-events");
/**
 * A plugin that resolves `{@link Foo}` tags.
 */
let LinkResolverPlugin = (() => {
    var _LinkResolverPlugin_validation_accessor_storage;
    let _classDecorators = [(0, components_1.Component)({ name: "link-resolver" })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = components_1.ConverterComponent;
    let _instanceExtraInitializers = [];
    let _validation_decorators;
    let _validation_initializers = [];
    var LinkResolverPlugin = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            _LinkResolverPlugin_validation_accessor_storage.set(this, (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _validation_initializers, void 0)));
        }
        get validation() { return __classPrivateFieldGet(this, _LinkResolverPlugin_validation_accessor_storage, "f"); }
        set validation(value) { __classPrivateFieldSet(this, _LinkResolverPlugin_validation_accessor_storage, value, "f"); }
        initialize() {
            super.initialize();
            this.owner.on(converter_events_1.ConverterEvents.RESOLVE_END, this.onResolve, this, -300);
            this.application.on(application_events_1.ApplicationEvents.REVIVE, this.resolveLinks, this, -300);
        }
        onResolve(context) {
            this.resolveLinks(context.project);
        }
        resolveLinks(project) {
            for (const id in project.reflections) {
                const reflection = project.reflections[id];
                if (reflection.comment) {
                    this.owner.resolveLinks(reflection.comment, reflection);
                }
                if (reflection instanceof models_1.DeclarationReflection &&
                    reflection.readme) {
                    reflection.readme = this.owner.resolveLinks(reflection.readme, reflection);
                }
                if (reflection instanceof models_1.ContainerReflection) {
                    if (reflection.groups) {
                        for (const group of reflection.groups) {
                            if (group.description) {
                                group.description = this.owner.resolveLinks(group.description, reflection);
                            }
                            if (group.categories) {
                                for (const cat of group.categories) {
                                    this.resolveCategoryLinks(cat, reflection);
                                }
                            }
                        }
                    }
                    if (reflection.categories) {
                        for (const cat of reflection.categories) {
                            this.resolveCategoryLinks(cat, reflection);
                        }
                    }
                }
            }
            if (project.readme) {
                project.readme = this.owner.resolveLinks(project.readme, project);
            }
            for (const { type, owner } of (0, reflections_1.discoverAllReferenceTypes)(project, false)) {
                if (!type.reflection) {
                    const resolveResult = this.owner.resolveExternalLink(type.toDeclarationReference(), owner, undefined, type.symbolId);
                    switch (typeof resolveResult) {
                        case "string":
                            type.externalUrl = resolveResult;
                            break;
                        case "object":
                            type.externalUrl = resolveResult.target;
                            break;
                    }
                }
            }
        }
        resolveCategoryLinks(category, owner) {
            if (category.description) {
                category.description = this.owner.resolveLinks(category.description, owner);
            }
        }
    };
    _LinkResolverPlugin_validation_accessor_storage = new WeakMap();
    __setFunctionName(_classThis, "LinkResolverPlugin");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        _validation_decorators = [(0, utils_1.Option)("validation")];
        __esDecorate(_classThis, null, _validation_decorators, { kind: "accessor", name: "validation", static: false, private: false, access: { has: obj => "validation" in obj, get: obj => obj.validation, set: (obj, value) => { obj.validation = value; } }, metadata: _metadata }, _validation_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LinkResolverPlugin = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LinkResolverPlugin = _classThis;
})();
exports.LinkResolverPlugin = LinkResolverPlugin;
