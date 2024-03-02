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
exports.InheritDocPlugin = void 0;
const models_1 = require("../../models");
const components_1 = require("../components");
const converter_1 = require("../converter");
const utils_1 = require("../../utils");
const array_1 = require("../../utils/array");
const declarationReference_1 = require("../comments/declarationReference");
const declarationReferenceResolver_1 = require("../comments/declarationReferenceResolver");
const application_events_1 = require("../../application-events");
/**
 * A plugin that handles `@inheritDoc` tags by copying documentation from another API item.
 * It is NOT responsible for handling bare JSDoc style `@inheritDoc` tags which do not specify
 * a target to inherit from. Those are handled by the ImplementsPlugin class.
 *
 * What gets copied:
 * - short text
 * - text
 * - `@remarks` block
 * - `@params` block
 * - `@typeParam` block
 * - `@return` block
 */
let InheritDocPlugin = (() => {
    var _InheritDocPlugin_validation_accessor_storage;
    let _classDecorators = [(0, components_1.Component)({ name: "inheritDoc" })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = components_1.ConverterComponent;
    let _instanceExtraInitializers = [];
    let _validation_decorators;
    let _validation_initializers = [];
    var InheritDocPlugin = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            _InheritDocPlugin_validation_accessor_storage.set(this, (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _validation_initializers, void 0)));
            // Key is depended on by Values
            this.dependencies = new utils_1.DefaultMap(() => []);
        }
        get validation() { return __classPrivateFieldGet(this, _InheritDocPlugin_validation_accessor_storage, "f"); }
        set validation(value) { __classPrivateFieldSet(this, _InheritDocPlugin_validation_accessor_storage, value, "f"); }
        /**
         * Create a new InheritDocPlugin instance.
         */
        initialize() {
            this.owner.on(converter_1.Converter.EVENT_RESOLVE_END, (context) => this.processInheritDoc(context.project));
            this.application.on(application_events_1.ApplicationEvents.REVIVE, this.processInheritDoc, this);
        }
        /**
         * Traverse through reflection descendant to check for `inheritDoc` tag.
         * If encountered, the parameter of the tag is used to determine a source reflection
         * that will provide actual comment.
         */
        processInheritDoc(project) {
            for (const id in project.reflections) {
                const reflection = project.reflections[id];
                const source = extractInheritDocTagReference(reflection);
                if (!source)
                    continue;
                const declRef = (0, declarationReference_1.parseDeclarationReference)(source, 0, source.length);
                if (!declRef || /\S/.test(source.substring(declRef[1]))) {
                    this.application.logger.warn(`Declaration reference in @inheritDoc for ${reflection.getFriendlyFullName()} was not fully parsed and may resolve incorrectly.`);
                }
                let sourceRefl = declRef && (0, declarationReferenceResolver_1.resolveDeclarationReference)(reflection, declRef[0]);
                if (reflection instanceof models_1.SignatureReflection) {
                    // Assumes that if there are overloads, they are declared in the same order as the parent.
                    // TS doesn't check this, but if a user messes this up then they are almost
                    // guaranteed to run into bugs where they can't call a method on a child class
                    // but if they assign (without a type assertion) that child to a variable of the parent class
                    // then they can call the method.
                    if (sourceRefl instanceof models_1.DeclarationReflection) {
                        const index = reflection.parent
                            .getAllSignatures()
                            .indexOf(reflection);
                        sourceRefl =
                            sourceRefl.getAllSignatures()[index] || sourceRefl;
                    }
                }
                if (sourceRefl instanceof models_1.DeclarationReflection &&
                    sourceRefl.kindOf(models_1.ReflectionKind.Accessor)) {
                    // Accessors, like functions, never have comments on their actual root reflection.
                    // If the user didn't specify whether to inherit from the getter or setter, then implicitly
                    // try to inherit from the getter, #1968.
                    sourceRefl = sourceRefl.getSignature || sourceRefl.setSignature;
                }
                if (!sourceRefl) {
                    if (this.validation.invalidLink) {
                        this.application.logger.warn(`Failed to find "${source}" to inherit the comment from in the comment for ${reflection.getFullName()}`);
                    }
                    continue;
                }
                this.copyComment(sourceRefl, reflection);
            }
            this.createCircularDependencyWarnings();
            this.dependencies.clear();
        }
        copyComment(source, target) {
            if (!target.comment)
                return;
            if (!source.comment &&
                source instanceof models_1.DeclarationReflection &&
                source.signatures) {
                source = source.signatures[0];
            }
            if (!source.comment &&
                source instanceof models_1.DeclarationReflection &&
                source.type instanceof models_1.ReflectionType &&
                source.type.declaration.signatures) {
                source = source.type.declaration.signatures[0];
            }
            if (!source.comment) {
                this.application.logger.warn(`${target.getFullName()} tried to copy a comment from ${source.getFullName()} with @inheritDoc, but the source has no associated comment.`);
                return;
            }
            // If the source also has a @inheritDoc tag, we can't do anything yet.
            // We'll try again later, once we've resolved the source's @inheritDoc reference.
            if (extractInheritDocTagReference(source)) {
                this.dependencies.get(source).push(target);
                return;
            }
            target.comment.removeTags("@inheritDoc");
            target.comment.summary = models_1.Comment.cloneDisplayParts(source.comment.summary);
            const remarks = source.comment.getTag("@remarks");
            if (remarks) {
                target.comment.blockTags.unshift(remarks.clone());
            }
            const returns = source.comment.getTag("@returns");
            if (returns) {
                target.comment.blockTags.push(returns.clone());
            }
            if (source instanceof models_1.SignatureReflection &&
                target instanceof models_1.SignatureReflection) {
                copySummaries(source.parameters, target.parameters);
                copySummaries(source.typeParameters, target.typeParameters);
            }
            else if (source instanceof models_1.DeclarationReflection &&
                target instanceof models_1.DeclarationReflection) {
                copySummaries(source.typeParameters, target.typeParameters);
            }
            // Now copy the comment for anyone who depends on me.
            const dependent = this.dependencies.get(target);
            this.dependencies.delete(target);
            for (const target2 of dependent) {
                this.copyComment(target, target2);
            }
        }
        createCircularDependencyWarnings() {
            const unwarned = new Set(this.dependencies.keys());
            const generateWarning = (orig) => {
                const parts = [orig.name];
                unwarned.delete(orig);
                let work = orig;
                do {
                    work = this.dependencies.get(work)[0];
                    unwarned.delete(work);
                    parts.push(work.name);
                } while (!this.dependencies.get(work).includes(orig));
                parts.push(orig.name);
                this.application.logger.warn(`@inheritDoc specifies a circular inheritance chain: ${parts
                    .reverse()
                    .join(" -> ")}`);
            };
            for (const orig of this.dependencies.keys()) {
                if (unwarned.has(orig)) {
                    generateWarning(orig);
                }
            }
        }
    };
    _InheritDocPlugin_validation_accessor_storage = new WeakMap();
    __setFunctionName(_classThis, "InheritDocPlugin");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        _validation_decorators = [(0, utils_1.Option)("validation")];
        __esDecorate(_classThis, null, _validation_decorators, { kind: "accessor", name: "validation", static: false, private: false, access: { has: obj => "validation" in obj, get: obj => obj.validation, set: (obj, value) => { obj.validation = value; } }, metadata: _metadata }, _validation_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InheritDocPlugin = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InheritDocPlugin = _classThis;
})();
exports.InheritDocPlugin = InheritDocPlugin;
function copySummaries(source, target) {
    for (const [s, t] of (0, array_1.zip)(source || [], target || [])) {
        t.comment = new models_1.Comment(s.comment?.summary);
    }
}
function extractInheritDocTagReference(reflection) {
    const comment = reflection.comment;
    if (!comment)
        return;
    const blockTag = comment.blockTags.find((tag) => tag.tag === "@inheritDoc");
    if (blockTag) {
        return blockTag.name;
    }
    const inlineTag = comment.summary.find((part) => part.kind === "inline-tag" && part.tag === "@inheritDoc");
    if (inlineTag) {
        return inlineTag.text;
    }
}
