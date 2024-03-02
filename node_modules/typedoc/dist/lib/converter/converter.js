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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Converter = void 0;
const typescript_1 = __importDefault(require("typescript"));
const index_1 = require("../models/index");
const context_1 = require("./context");
const components_1 = require("./components");
const component_1 = require("../utils/component");
const utils_1 = require("../utils");
const types_1 = require("./types");
const converter_events_1 = require("./converter-events");
const symbols_1 = require("./symbols");
const paths_1 = require("../utils/paths");
const enum_1 = require("../utils/enum");
const parser_1 = require("./comments/parser");
const rawLexer_1 = require("./comments/rawLexer");
const linkResolver_1 = require("./comments/linkResolver");
/**
 * Compiles source files using TypeScript and converts compiler symbols to reflections.
 */
let Converter = (() => {
    var _Converter_externalPattern_accessor_storage, _Converter_excludeExternals_accessor_storage, _Converter_excludeNotDocumented_accessor_storage, _Converter_excludePrivate_accessor_storage, _Converter_excludeProtected_accessor_storage, _Converter_excludeReferences_accessor_storage, _Converter_commentStyle_accessor_storage, _Converter_validation_accessor_storage, _Converter_externalSymbolLinkMappings_accessor_storage, _Converter_useTsLinkResolution_accessor_storage, _Converter_preserveLinkText_accessor_storage, _Converter_maxTypeConversionDepth_accessor_storage;
    let _classDecorators = [(0, component_1.Component)({
            name: "converter",
            internal: true,
            childClass: components_1.ConverterComponent,
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = component_1.ChildableComponent;
    let _instanceExtraInitializers = [];
    let _externalPattern_decorators;
    let _externalPattern_initializers = [];
    let _excludeExternals_decorators;
    let _excludeExternals_initializers = [];
    let _excludeNotDocumented_decorators;
    let _excludeNotDocumented_initializers = [];
    let _excludePrivate_decorators;
    let _excludePrivate_initializers = [];
    let _excludeProtected_decorators;
    let _excludeProtected_initializers = [];
    let _excludeReferences_decorators;
    let _excludeReferences_initializers = [];
    let _commentStyle_decorators;
    let _commentStyle_initializers = [];
    let _validation_decorators;
    let _validation_initializers = [];
    let _externalSymbolLinkMappings_decorators;
    let _externalSymbolLinkMappings_initializers = [];
    let _useTsLinkResolution_decorators;
    let _useTsLinkResolution_initializers = [];
    let _preserveLinkText_decorators;
    let _preserveLinkText_initializers = [];
    let _maxTypeConversionDepth_decorators;
    let _maxTypeConversionDepth_initializers = [];
    var Converter = _classThis = class extends _classSuper {
        /** @internal */
        get externalPattern() { return __classPrivateFieldGet(this, _Converter_externalPattern_accessor_storage, "f"); }
        set externalPattern(value) { __classPrivateFieldSet(this, _Converter_externalPattern_accessor_storage, value, "f"); }
        /** @internal */
        get excludeExternals() { return __classPrivateFieldGet(this, _Converter_excludeExternals_accessor_storage, "f"); }
        set excludeExternals(value) { __classPrivateFieldSet(this, _Converter_excludeExternals_accessor_storage, value, "f"); }
        /** @internal */
        get excludeNotDocumented() { return __classPrivateFieldGet(this, _Converter_excludeNotDocumented_accessor_storage, "f"); }
        set excludeNotDocumented(value) { __classPrivateFieldSet(this, _Converter_excludeNotDocumented_accessor_storage, value, "f"); }
        /** @internal */
        get excludePrivate() { return __classPrivateFieldGet(this, _Converter_excludePrivate_accessor_storage, "f"); }
        set excludePrivate(value) { __classPrivateFieldSet(this, _Converter_excludePrivate_accessor_storage, value, "f"); }
        /** @internal */
        get excludeProtected() { return __classPrivateFieldGet(this, _Converter_excludeProtected_accessor_storage, "f"); }
        set excludeProtected(value) { __classPrivateFieldSet(this, _Converter_excludeProtected_accessor_storage, value, "f"); }
        /** @internal */
        get excludeReferences() { return __classPrivateFieldGet(this, _Converter_excludeReferences_accessor_storage, "f"); }
        set excludeReferences(value) { __classPrivateFieldSet(this, _Converter_excludeReferences_accessor_storage, value, "f"); }
        /** @internal */
        get commentStyle() { return __classPrivateFieldGet(this, _Converter_commentStyle_accessor_storage, "f"); }
        set commentStyle(value) { __classPrivateFieldSet(this, _Converter_commentStyle_accessor_storage, value, "f"); }
        /** @internal */
        get validation() { return __classPrivateFieldGet(this, _Converter_validation_accessor_storage, "f"); }
        set validation(value) { __classPrivateFieldSet(this, _Converter_validation_accessor_storage, value, "f"); }
        /** @internal */
        get externalSymbolLinkMappings() { return __classPrivateFieldGet(this, _Converter_externalSymbolLinkMappings_accessor_storage, "f"); }
        set externalSymbolLinkMappings(value) { __classPrivateFieldSet(this, _Converter_externalSymbolLinkMappings_accessor_storage, value, "f"); }
        /** @internal */
        get useTsLinkResolution() { return __classPrivateFieldGet(this, _Converter_useTsLinkResolution_accessor_storage, "f"); }
        set useTsLinkResolution(value) { __classPrivateFieldSet(this, _Converter_useTsLinkResolution_accessor_storage, value, "f"); }
        /** @internal */
        get preserveLinkText() { return __classPrivateFieldGet(this, _Converter_preserveLinkText_accessor_storage, "f"); }
        set preserveLinkText(value) { __classPrivateFieldSet(this, _Converter_preserveLinkText_accessor_storage, value, "f"); }
        /** @internal */
        get maxTypeConversionDepth() { return __classPrivateFieldGet(this, _Converter_maxTypeConversionDepth_accessor_storage, "f"); }
        set maxTypeConversionDepth(value) { __classPrivateFieldSet(this, _Converter_maxTypeConversionDepth_accessor_storage, value, "f"); }
        get config() {
            return this._config || this._buildCommentParserConfig();
        }
        constructor(owner) {
            super(owner);
            _Converter_externalPattern_accessor_storage.set(this, (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _externalPattern_initializers, void 0)));
            _Converter_excludeExternals_accessor_storage.set(this, __runInitializers(this, _excludeExternals_initializers, void 0));
            _Converter_excludeNotDocumented_accessor_storage.set(this, __runInitializers(this, _excludeNotDocumented_initializers, void 0));
            _Converter_excludePrivate_accessor_storage.set(this, __runInitializers(this, _excludePrivate_initializers, void 0));
            _Converter_excludeProtected_accessor_storage.set(this, __runInitializers(this, _excludeProtected_initializers, void 0));
            _Converter_excludeReferences_accessor_storage.set(this, __runInitializers(this, _excludeReferences_initializers, void 0));
            _Converter_commentStyle_accessor_storage.set(this, __runInitializers(this, _commentStyle_initializers, void 0));
            _Converter_validation_accessor_storage.set(this, __runInitializers(this, _validation_initializers, void 0));
            _Converter_externalSymbolLinkMappings_accessor_storage.set(this, __runInitializers(this, _externalSymbolLinkMappings_initializers, void 0));
            _Converter_useTsLinkResolution_accessor_storage.set(this, __runInitializers(this, _useTsLinkResolution_initializers, void 0));
            _Converter_preserveLinkText_accessor_storage.set(this, __runInitializers(this, _preserveLinkText_initializers, void 0));
            _Converter_maxTypeConversionDepth_accessor_storage.set(this, __runInitializers(this, _maxTypeConversionDepth_initializers, void 0));
            this._externalSymbolResolvers = [];
            this.addUnknownSymbolResolver((ref) => {
                // Require global links, matching local ones will likely hide mistakes where the
                // user meant to link to a local type.
                if (ref.resolutionStart !== "global" || !ref.symbolReference) {
                    return;
                }
                const modLinks = this.externalSymbolLinkMappings[ref.moduleSource ?? "global"];
                if (typeof modLinks !== "object") {
                    return;
                }
                let name = "";
                if (ref.symbolReference.path) {
                    name += ref.symbolReference.path.map((p) => p.path).join(".");
                }
                if (ref.symbolReference.meaning) {
                    name += ":" + ref.symbolReference.meaning;
                }
                if (typeof modLinks[name] === "string") {
                    return modLinks[name];
                }
                if (typeof modLinks["*"] === "string") {
                    return modLinks["*"];
                }
            });
        }
        /**
         * Compile the given source files and create a project reflection for them.
         */
        convert(entryPoints) {
            const programs = (0, utils_1.unique)(entryPoints.map((e) => e.program));
            this.externalPatternCache = void 0;
            const project = new index_1.ProjectReflection(this.application.options.getValue("name"));
            const context = new context_1.Context(this, programs, project);
            this.trigger(Converter.EVENT_BEGIN, context);
            this.compile(entryPoints, context);
            this.resolve(context);
            this.trigger(Converter.EVENT_END, context);
            this._config = undefined;
            return project;
        }
        /** @internal */
        convertSymbol(context, symbol, exportSymbol) {
            (0, symbols_1.convertSymbol)(context, symbol, exportSymbol);
        }
        /**
         * Convert the given TypeScript type into its TypeDoc type reflection.
         *
         * @param context  The context object describing the current state the converter is in.
         * @returns The TypeDoc type reflection representing the given node and type.
         * @internal
         */
        convertType(context, node) {
            return (0, types_1.convertType)(context, node);
        }
        /**
         * Parse the given file into a comment. Intended to be used with markdown files.
         */
        parseRawComment(file) {
            return (0, parser_1.parseComment)((0, rawLexer_1.lexCommentString)(file.text), this.config, file, this.application.logger);
        }
        /**
         * Adds a new resolver that the theme can use to try to figure out how to link to a symbol declared
         * by a third-party library which is not included in the documentation.
         *
         * The resolver function will be passed a declaration reference which it can attempt to resolve. If
         * resolution fails, the function should return undefined.
         *
         * Note: This will be used for both references to types declared in node_modules (in which case the
         * reference passed will have the `moduleSource` set and the `symbolReference` will navigate via `.`)
         * and user defined \{\@link\} tags which cannot be resolved. If the link being resolved is inferred
         * from a type, then no `part` will be passed to the resolver function.
         * @since 0.22.14
         */
        addUnknownSymbolResolver(resolver) {
            this._externalSymbolResolvers.push(resolver);
        }
        /** @internal */
        resolveExternalLink(ref, refl, part, symbolId) {
            for (const resolver of this._externalSymbolResolvers) {
                const resolved = resolver(ref, refl, part, symbolId);
                if (resolved)
                    return resolved;
            }
        }
        resolveLinks(comment, owner) {
            if (comment instanceof index_1.Comment) {
                (0, linkResolver_1.resolveLinks)(comment, owner, (ref, part, refl, id) => this.resolveExternalLink(ref, part, refl, id), { preserveLinkText: this.preserveLinkText });
            }
            else {
                return (0, linkResolver_1.resolvePartLinks)(owner, comment, (ref, part, refl, id) => this.resolveExternalLink(ref, part, refl, id), { preserveLinkText: this.preserveLinkText });
            }
        }
        /**
         * Compile the files within the given context and convert the compiler symbols to reflections.
         *
         * @param context  The context object describing the current state the converter is in.
         * @returns An array containing all errors generated by the TypeScript compiler.
         */
        compile(entryPoints, context) {
            const entries = entryPoints.map((e) => {
                return {
                    entryPoint: e,
                    context: undefined,
                };
            });
            entries.forEach((e) => {
                context.setActiveProgram(e.entryPoint.program);
                e.context = this.convertExports(context, e.entryPoint, entries.length === 1);
            });
            for (const { entryPoint, context } of entries) {
                // active program is already set on context
                // if we don't have a context, then this entry point is being ignored
                if (context) {
                    this.convertReExports(context, entryPoint.sourceFile);
                }
            }
            context.setActiveProgram(undefined);
        }
        convertExports(context, entryPoint, singleEntryPoint) {
            const node = entryPoint.sourceFile;
            const entryName = entryPoint.displayName;
            const symbol = getSymbolForModuleLike(context, node);
            let moduleContext;
            if (singleEntryPoint) {
                // Special case for when we're giving a single entry point, we don't need to
                // create modules for each entry. Register the project as this module.
                context.project.registerReflection(context.project, symbol);
                context.project.comment = symbol
                    ? context.getComment(symbol, context.project.kind)
                    : context.getFileComment(node);
                context.trigger(Converter.EVENT_CREATE_DECLARATION, context.project);
                moduleContext = context;
            }
            else {
                const reflection = context.createDeclarationReflection(index_1.ReflectionKind.Module, symbol, void 0, entryName);
                if (!reflection.comment && !symbol) {
                    reflection.comment = context.getFileComment(node);
                }
                if (entryPoint.readmeFile) {
                    const readme = (0, utils_1.readFile)(entryPoint.readmeFile);
                    const comment = this.parseRawComment(new utils_1.MinimalSourceFile(readme, entryPoint.readmeFile));
                    if (comment.blockTags.length || comment.modifierTags.size) {
                        const ignored = [
                            ...comment.blockTags.map((tag) => tag.tag),
                            ...comment.modifierTags,
                        ];
                        context.logger.warn(`Block and modifier tags will be ignored within the readme:\n\t${ignored.join("\n\t")}`);
                    }
                    reflection.readme = comment.summary;
                }
                reflection.packageVersion = entryPoint.version;
                context.finalizeDeclarationReflection(reflection);
                moduleContext = context.withScope(reflection);
            }
            const allExports = getExports(context, node, symbol);
            for (const exp of allExports.filter((exp) => isDirectExport(context.resolveAliasedSymbol(exp), node))) {
                this.convertSymbol(moduleContext, exp);
            }
            return moduleContext;
        }
        convertReExports(moduleContext, node) {
            for (const exp of getExports(moduleContext, node, moduleContext.project.getSymbolFromReflection(moduleContext.scope)).filter((exp) => !isDirectExport(moduleContext.resolveAliasedSymbol(exp), node))) {
                this.convertSymbol(moduleContext, exp);
            }
        }
        /**
         * Resolve the project within the given context.
         *
         * @param context  The context object describing the current state the converter is in.
         * @returns The final project reflection.
         */
        resolve(context) {
            this.trigger(Converter.EVENT_RESOLVE_BEGIN, context);
            const project = context.project;
            for (const id in project.reflections) {
                this.trigger(Converter.EVENT_RESOLVE, context, project.reflections[id]);
            }
            this.trigger(Converter.EVENT_RESOLVE_END, context);
        }
        /**
         * Used to determine if we should immediately bail when creating a reflection.
         * Note: This should not be used for excludeNotDocumented because we don't have enough
         * information at this point since comment discovery hasn't happened.
         * @internal
         */
        shouldIgnore(symbol) {
            if (this.isExcluded(symbol)) {
                return true;
            }
            return this.excludeExternals && this.isExternal(symbol);
        }
        isExcluded(symbol) {
            this.excludeCache ??= (0, paths_1.createMinimatch)(this.application.options.getValue("exclude"));
            const cache = this.excludeCache;
            return (symbol.getDeclarations() ?? []).some((node) => (0, paths_1.matchesAny)(cache, node.getSourceFile().fileName));
        }
        /** @internal */
        isExternal(symbol) {
            this.externalPatternCache ??= (0, paths_1.createMinimatch)(this.externalPattern);
            const cache = this.externalPatternCache;
            return (symbol.getDeclarations() ?? []).some((node) => (0, paths_1.matchesAny)(cache, node.getSourceFile().fileName));
        }
        _buildCommentParserConfig() {
            this._config = {
                blockTags: new Set(this.application.options.getValue("blockTags")),
                inlineTags: new Set(this.application.options.getValue("inlineTags")),
                modifierTags: new Set(this.application.options.getValue("modifierTags")),
                jsDocCompatibility: this.application.options.getValue("jsDocCompatibility"),
            };
            return this._config;
        }
    };
    _Converter_externalPattern_accessor_storage = new WeakMap();
    _Converter_excludeExternals_accessor_storage = new WeakMap();
    _Converter_excludeNotDocumented_accessor_storage = new WeakMap();
    _Converter_excludePrivate_accessor_storage = new WeakMap();
    _Converter_excludeProtected_accessor_storage = new WeakMap();
    _Converter_excludeReferences_accessor_storage = new WeakMap();
    _Converter_commentStyle_accessor_storage = new WeakMap();
    _Converter_validation_accessor_storage = new WeakMap();
    _Converter_externalSymbolLinkMappings_accessor_storage = new WeakMap();
    _Converter_useTsLinkResolution_accessor_storage = new WeakMap();
    _Converter_preserveLinkText_accessor_storage = new WeakMap();
    _Converter_maxTypeConversionDepth_accessor_storage = new WeakMap();
    __setFunctionName(_classThis, "Converter");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        _externalPattern_decorators = [(0, utils_1.Option)("externalPattern")];
        _excludeExternals_decorators = [(0, utils_1.Option)("excludeExternals")];
        _excludeNotDocumented_decorators = [(0, utils_1.Option)("excludeNotDocumented")];
        _excludePrivate_decorators = [(0, utils_1.Option)("excludePrivate")];
        _excludeProtected_decorators = [(0, utils_1.Option)("excludeProtected")];
        _excludeReferences_decorators = [(0, utils_1.Option)("excludeReferences")];
        _commentStyle_decorators = [(0, utils_1.Option)("commentStyle")];
        _validation_decorators = [(0, utils_1.Option)("validation")];
        _externalSymbolLinkMappings_decorators = [(0, utils_1.Option)("externalSymbolLinkMappings")];
        _useTsLinkResolution_decorators = [(0, utils_1.Option)("useTsLinkResolution")];
        _preserveLinkText_decorators = [(0, utils_1.Option)("preserveLinkText")];
        _maxTypeConversionDepth_decorators = [(0, utils_1.Option)("maxTypeConversionDepth")];
        __esDecorate(_classThis, null, _externalPattern_decorators, { kind: "accessor", name: "externalPattern", static: false, private: false, access: { has: obj => "externalPattern" in obj, get: obj => obj.externalPattern, set: (obj, value) => { obj.externalPattern = value; } }, metadata: _metadata }, _externalPattern_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _excludeExternals_decorators, { kind: "accessor", name: "excludeExternals", static: false, private: false, access: { has: obj => "excludeExternals" in obj, get: obj => obj.excludeExternals, set: (obj, value) => { obj.excludeExternals = value; } }, metadata: _metadata }, _excludeExternals_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _excludeNotDocumented_decorators, { kind: "accessor", name: "excludeNotDocumented", static: false, private: false, access: { has: obj => "excludeNotDocumented" in obj, get: obj => obj.excludeNotDocumented, set: (obj, value) => { obj.excludeNotDocumented = value; } }, metadata: _metadata }, _excludeNotDocumented_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _excludePrivate_decorators, { kind: "accessor", name: "excludePrivate", static: false, private: false, access: { has: obj => "excludePrivate" in obj, get: obj => obj.excludePrivate, set: (obj, value) => { obj.excludePrivate = value; } }, metadata: _metadata }, _excludePrivate_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _excludeProtected_decorators, { kind: "accessor", name: "excludeProtected", static: false, private: false, access: { has: obj => "excludeProtected" in obj, get: obj => obj.excludeProtected, set: (obj, value) => { obj.excludeProtected = value; } }, metadata: _metadata }, _excludeProtected_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _excludeReferences_decorators, { kind: "accessor", name: "excludeReferences", static: false, private: false, access: { has: obj => "excludeReferences" in obj, get: obj => obj.excludeReferences, set: (obj, value) => { obj.excludeReferences = value; } }, metadata: _metadata }, _excludeReferences_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _commentStyle_decorators, { kind: "accessor", name: "commentStyle", static: false, private: false, access: { has: obj => "commentStyle" in obj, get: obj => obj.commentStyle, set: (obj, value) => { obj.commentStyle = value; } }, metadata: _metadata }, _commentStyle_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _validation_decorators, { kind: "accessor", name: "validation", static: false, private: false, access: { has: obj => "validation" in obj, get: obj => obj.validation, set: (obj, value) => { obj.validation = value; } }, metadata: _metadata }, _validation_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _externalSymbolLinkMappings_decorators, { kind: "accessor", name: "externalSymbolLinkMappings", static: false, private: false, access: { has: obj => "externalSymbolLinkMappings" in obj, get: obj => obj.externalSymbolLinkMappings, set: (obj, value) => { obj.externalSymbolLinkMappings = value; } }, metadata: _metadata }, _externalSymbolLinkMappings_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _useTsLinkResolution_decorators, { kind: "accessor", name: "useTsLinkResolution", static: false, private: false, access: { has: obj => "useTsLinkResolution" in obj, get: obj => obj.useTsLinkResolution, set: (obj, value) => { obj.useTsLinkResolution = value; } }, metadata: _metadata }, _useTsLinkResolution_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _preserveLinkText_decorators, { kind: "accessor", name: "preserveLinkText", static: false, private: false, access: { has: obj => "preserveLinkText" in obj, get: obj => obj.preserveLinkText, set: (obj, value) => { obj.preserveLinkText = value; } }, metadata: _metadata }, _preserveLinkText_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _maxTypeConversionDepth_decorators, { kind: "accessor", name: "maxTypeConversionDepth", static: false, private: false, access: { has: obj => "maxTypeConversionDepth" in obj, get: obj => obj.maxTypeConversionDepth, set: (obj, value) => { obj.maxTypeConversionDepth = value; } }, metadata: _metadata }, _maxTypeConversionDepth_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Converter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    /**
     * General events
     */
    /**
     * Triggered when the converter begins converting a project.
     * The listener will be given a {@link Context} object.
     * @event
     */
    _classThis.EVENT_BEGIN = converter_events_1.ConverterEvents.BEGIN;
    /**
     * Triggered when the converter has finished converting a project.
     * The listener will be given a {@link Context} object.
     * @event
     */
    _classThis.EVENT_END = converter_events_1.ConverterEvents.END;
    /**
     * Factory events
     */
    /**
     * Triggered when the converter has created a declaration reflection.
     * The listener will be given {@link Context} and a {@link Models.DeclarationReflection}.
     * @event
     */
    _classThis.EVENT_CREATE_DECLARATION = converter_events_1.ConverterEvents.CREATE_DECLARATION;
    /**
     * Triggered when the converter has created a signature reflection.
     * The listener will be given {@link Context}, {@link Models.SignatureReflection} | {@link Models.ProjectReflection} the declaration,
     * `ts.SignatureDeclaration | ts.IndexSignatureDeclaration | ts.JSDocSignature | undefined`,
     * and `ts.Signature | undefined`. The signature will be undefined if the created signature is an index signature.
     * @event
     */
    _classThis.EVENT_CREATE_SIGNATURE = converter_events_1.ConverterEvents.CREATE_SIGNATURE;
    /**
     * Triggered when the converter has created a parameter reflection.
     * The listener will be given {@link Context}, {@link Models.ParameterReflection} and a `ts.Node?`
     * @event
     */
    _classThis.EVENT_CREATE_PARAMETER = converter_events_1.ConverterEvents.CREATE_PARAMETER;
    /**
     * Triggered when the converter has created a type parameter reflection.
     * The listener will be given {@link Context} and a {@link Models.TypeParameterReflection}
     * @event
     */
    _classThis.EVENT_CREATE_TYPE_PARAMETER = converter_events_1.ConverterEvents.CREATE_TYPE_PARAMETER;
    /**
     * Resolve events
     */
    /**
     * Triggered when the converter begins resolving a project.
     * The listener will be given {@link Context}.
     * @event
     */
    _classThis.EVENT_RESOLVE_BEGIN = converter_events_1.ConverterEvents.RESOLVE_BEGIN;
    /**
     * Triggered when the converter resolves a reflection.
     * The listener will be given {@link Context} and a {@link Reflection}.
     * @event
     */
    _classThis.EVENT_RESOLVE = converter_events_1.ConverterEvents.RESOLVE;
    /**
     * Triggered when the converter has finished resolving a project.
     * The listener will be given {@link Context}.
     * @event
     */
    _classThis.EVENT_RESOLVE_END = converter_events_1.ConverterEvents.RESOLVE_END;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Converter = _classThis;
})();
exports.Converter = Converter;
function getSymbolForModuleLike(context, node) {
    const symbol = context.checker.getSymbolAtLocation(node) ?? node.symbol;
    if (symbol) {
        return symbol;
    }
    // This is a global file, get all symbols declared in this file...
    // this isn't the best solution, it would be nice to have all globals given to a special
    // "globals" file, but this is uncommon enough that I'm skipping it for now.
    const sourceFile = node.getSourceFile();
    const globalSymbols = context.checker
        .getSymbolsInScope(node, typescript_1.default.SymbolFlags.ModuleMember)
        .filter((s) => s
        .getDeclarations()
        ?.some((d) => d.getSourceFile() === sourceFile));
    // Detect declaration files with declare module "foo" as their only export
    // and lift that up one level as the source file symbol
    if (globalSymbols.length === 1 &&
        globalSymbols[0]
            .getDeclarations()
            ?.every((declaration) => typescript_1.default.isModuleDeclaration(declaration) &&
            typescript_1.default.isStringLiteral(declaration.name))) {
        return globalSymbols[0];
    }
}
function getExports(context, node, symbol) {
    let result;
    // The generated docs aren't great, but you really ought not be using
    // this in the first place... so it's better than nothing.
    const exportEq = symbol?.exports?.get("export=");
    if (exportEq) {
        // JS users might also have exported types here.
        // We need to filter for types because otherwise static methods can show up as both
        // members of the export= class and as functions if a class is directly exported.
        result = [exportEq].concat(context.checker
            .getExportsOfModule(symbol)
            .filter((s) => !(0, enum_1.hasAnyFlag)(s.flags, typescript_1.default.SymbolFlags.Prototype | typescript_1.default.SymbolFlags.Value)));
    }
    else if (symbol) {
        result = context.checker
            .getExportsOfModule(symbol)
            .filter((s) => !(0, enum_1.hasAllFlags)(s.flags, typescript_1.default.SymbolFlags.Prototype));
        if (result.length === 0) {
            const globalDecl = node.statements.find((s) => typescript_1.default.isModuleDeclaration(s) &&
                s.flags & typescript_1.default.NodeFlags.GlobalAugmentation);
            if (globalDecl) {
                const globalSymbol = context.getSymbolAtLocation(globalDecl);
                if (globalSymbol) {
                    result = context.checker
                        .getExportsOfModule(globalSymbol)
                        .filter((exp) => exp.declarations?.some((d) => d.getSourceFile() === node));
                }
            }
        }
    }
    else {
        // Global file with no inferred top level symbol, get all symbols declared in this file.
        const sourceFile = node.getSourceFile();
        result = context.checker
            .getSymbolsInScope(node, typescript_1.default.SymbolFlags.ModuleMember)
            .filter((s) => s
            .getDeclarations()
            ?.some((d) => d.getSourceFile() === sourceFile));
    }
    // Put symbols named "default" last, #1795
    result.sort((a, b) => {
        if (a.name === "default") {
            return 1;
        }
        else if (b.name === "default") {
            return -1;
        }
        return 0;
    });
    return result;
}
function isDirectExport(symbol, file) {
    return (symbol
        .getDeclarations()
        ?.every((decl) => decl.getSourceFile() === file) ?? false);
}
