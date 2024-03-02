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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypePlugin = void 0;
const index_1 = require("../../models/reflections/index");
const types_1 = require("../../models/types");
const components_1 = require("../components");
const converter_1 = require("../converter");
const application_events_1 = require("../../application-events");
/**
 * Responsible for adding `implementedBy` / `implementedFrom`
 */
let TypePlugin = (() => {
    let _classDecorators = [(0, components_1.Component)({ name: "type" })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = components_1.ConverterComponent;
    var TypePlugin = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.reflections = new Set();
        }
        /**
         * Create a new TypeHandler instance.
         */
        initialize() {
            this.listenTo(this.owner, {
                [converter_1.Converter.EVENT_RESOLVE]: this.onResolve,
                [converter_1.Converter.EVENT_RESOLVE_END]: this.onResolveEnd,
                [converter_1.Converter.EVENT_END]: () => this.reflections.clear(),
            });
            this.listenTo(this.application, {
                [application_events_1.ApplicationEvents.REVIVE]: this.onRevive,
            });
        }
        onRevive(project) {
            for (const id in project.reflections) {
                this.resolve(project, project.reflections[id], 
                /* create links */ false);
            }
            this.finishResolve(project);
            this.reflections.clear();
        }
        onResolve(context, reflection) {
            this.resolve(context.project, reflection);
        }
        resolve(project, reflection, createLinks = true) {
            if (!(reflection instanceof index_1.DeclarationReflection))
                return;
            if (reflection.kindOf(index_1.ReflectionKind.ClassOrInterface)) {
                this.postpone(reflection);
                walk(reflection.implementedTypes, (target) => {
                    this.postpone(target);
                    target.implementedBy ||= [];
                    if (createLinks) {
                        target.implementedBy.push(types_1.ReferenceType.createResolvedReference(reflection.name, reflection, project));
                    }
                });
                walk(reflection.extendedTypes, (target) => {
                    this.postpone(target);
                    target.extendedBy ||= [];
                    if (createLinks) {
                        target.extendedBy.push(types_1.ReferenceType.createResolvedReference(reflection.name, reflection, project));
                    }
                });
            }
            function walk(types, callback) {
                if (!types) {
                    return;
                }
                types.forEach((type) => {
                    if (!(type instanceof types_1.ReferenceType)) {
                        return;
                    }
                    if (!type.reflection ||
                        !(type.reflection instanceof index_1.DeclarationReflection)) {
                        return;
                    }
                    callback(type.reflection);
                });
            }
        }
        postpone(reflection) {
            this.reflections.add(reflection);
        }
        onResolveEnd(context) {
            this.finishResolve(context.project);
        }
        finishResolve(project) {
            this.reflections.forEach((reflection) => {
                if (reflection.implementedBy) {
                    reflection.implementedBy.sort((a, b) => {
                        if (a.name === b.name) {
                            return 0;
                        }
                        return a.name > b.name ? 1 : -1;
                    });
                }
                let root;
                let hierarchy;
                function push(types) {
                    const level = { types: types };
                    if (hierarchy) {
                        hierarchy.next = level;
                        hierarchy = level;
                    }
                    else {
                        root = hierarchy = level;
                    }
                }
                if (reflection.extendedTypes) {
                    push(reflection.extendedTypes);
                }
                push([
                    types_1.ReferenceType.createResolvedReference(reflection.name, reflection, project),
                ]);
                hierarchy.isTarget = true;
                if (reflection.extendedBy) {
                    push(reflection.extendedBy);
                }
                // No point setting up a hierarchy if there is no hierarchy to display
                if (root.next) {
                    reflection.typeHierarchy = root;
                }
            });
        }
    };
    __setFunctionName(_classThis, "TypePlugin");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TypePlugin = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TypePlugin = _classThis;
})();
exports.TypePlugin = TypePlugin;
