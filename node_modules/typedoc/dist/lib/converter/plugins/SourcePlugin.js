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
exports.SourcePlugin = void 0;
const typescript_1 = __importDefault(require("typescript"));
const index_1 = require("../../models/reflections/index");
const components_1 = require("../components");
const converter_1 = require("../converter");
const utils_1 = require("../../utils");
const nodes_1 = require("../utils/nodes");
const path_1 = require("path");
const models_1 = require("../../models");
const repository_1 = require("../utils/repository");
const base_path_1 = require("../utils/base-path");
/**
 * A handler that attaches source file information to reflections.
 */
let SourcePlugin = (() => {
    var _SourcePlugin_disableSources_accessor_storage, _SourcePlugin_gitRevision_accessor_storage, _SourcePlugin_gitRemote_accessor_storage, _SourcePlugin_disableGit_accessor_storage, _SourcePlugin_sourceLinkTemplate_accessor_storage, _SourcePlugin_basePath_accessor_storage;
    let _classDecorators = [(0, components_1.Component)({ name: "source" })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = components_1.ConverterComponent;
    let _instanceExtraInitializers = [];
    let _disableSources_decorators;
    let _disableSources_initializers = [];
    let _gitRevision_decorators;
    let _gitRevision_initializers = [];
    let _gitRemote_decorators;
    let _gitRemote_initializers = [];
    let _disableGit_decorators;
    let _disableGit_initializers = [];
    let _sourceLinkTemplate_decorators;
    let _sourceLinkTemplate_initializers = [];
    let _basePath_decorators;
    let _basePath_initializers = [];
    var SourcePlugin = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            _SourcePlugin_disableSources_accessor_storage.set(this, (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _disableSources_initializers, void 0)));
            _SourcePlugin_gitRevision_accessor_storage.set(this, __runInitializers(this, _gitRevision_initializers, void 0));
            _SourcePlugin_gitRemote_accessor_storage.set(this, __runInitializers(this, _gitRemote_initializers, void 0));
            _SourcePlugin_disableGit_accessor_storage.set(this, __runInitializers(this, _disableGit_initializers, void 0));
            _SourcePlugin_sourceLinkTemplate_accessor_storage.set(this, __runInitializers(this, _sourceLinkTemplate_initializers, void 0));
            _SourcePlugin_basePath_accessor_storage.set(this, __runInitializers(this, _basePath_initializers, void 0));
            /**
             * All file names to find the base path from.
             */
            this.fileNames = new Set();
            /**
             * List of known repositories.
             */
            this.repositories = {};
            /**
             * List of paths known to be not under git control.
             */
            this.ignoredPaths = new Set();
        }
        get disableSources() { return __classPrivateFieldGet(this, _SourcePlugin_disableSources_accessor_storage, "f"); }
        set disableSources(value) { __classPrivateFieldSet(this, _SourcePlugin_disableSources_accessor_storage, value, "f"); }
        get gitRevision() { return __classPrivateFieldGet(this, _SourcePlugin_gitRevision_accessor_storage, "f"); }
        set gitRevision(value) { __classPrivateFieldSet(this, _SourcePlugin_gitRevision_accessor_storage, value, "f"); }
        get gitRemote() { return __classPrivateFieldGet(this, _SourcePlugin_gitRemote_accessor_storage, "f"); }
        set gitRemote(value) { __classPrivateFieldSet(this, _SourcePlugin_gitRemote_accessor_storage, value, "f"); }
        get disableGit() { return __classPrivateFieldGet(this, _SourcePlugin_disableGit_accessor_storage, "f"); }
        set disableGit(value) { __classPrivateFieldSet(this, _SourcePlugin_disableGit_accessor_storage, value, "f"); }
        get sourceLinkTemplate() { return __classPrivateFieldGet(this, _SourcePlugin_sourceLinkTemplate_accessor_storage, "f"); }
        set sourceLinkTemplate(value) { __classPrivateFieldSet(this, _SourcePlugin_sourceLinkTemplate_accessor_storage, value, "f"); }
        get basePath() { return __classPrivateFieldGet(this, _SourcePlugin_basePath_accessor_storage, "f"); }
        set basePath(value) { __classPrivateFieldSet(this, _SourcePlugin_basePath_accessor_storage, value, "f"); }
        /**
         * Create a new SourceHandler instance.
         */
        initialize() {
            this.listenTo(this.owner, {
                [converter_1.Converter.EVENT_END]: this.onEnd,
                [converter_1.Converter.EVENT_CREATE_DECLARATION]: this.onDeclaration,
                [converter_1.Converter.EVENT_CREATE_SIGNATURE]: this.onSignature,
                [converter_1.Converter.EVENT_RESOLVE_BEGIN]: this.onBeginResolve,
            });
        }
        onEnd() {
            // Should probably clear repositories/ignoredPaths here, but these aren't likely to change between runs...
            this.fileNames.clear();
        }
        /**
         * Triggered when the converter has created a declaration reflection.
         *
         * Attach the current source file to the {@link DeclarationReflection.sources} array.
         *
         * @param _context  The context object describing the current state the converter is in.
         * @param reflection  The reflection that is currently processed.
         */
        onDeclaration(_context, reflection) {
            if (this.disableSources)
                return;
            const symbol = reflection.project.getSymbolFromReflection(reflection);
            for (const node of symbol?.declarations || []) {
                const sourceFile = node.getSourceFile();
                const fileName = base_path_1.BasePath.normalize(sourceFile.fileName);
                this.fileNames.add(fileName);
                let position;
                if (typescript_1.default.isSourceFile(node)) {
                    position = { character: 0, line: 0 };
                }
                else {
                    position = typescript_1.default.getLineAndCharacterOfPosition(sourceFile, getLocationNode(node).getStart());
                }
                reflection.sources ||= [];
                reflection.sources.push(new models_1.SourceReference(fileName, position.line + 1, position.character));
            }
        }
        onSignature(_context, reflection, sig) {
            if (this.disableSources || !sig)
                return;
            const sourceFile = sig.getSourceFile();
            const fileName = base_path_1.BasePath.normalize(sourceFile.fileName);
            this.fileNames.add(fileName);
            const position = typescript_1.default.getLineAndCharacterOfPosition(sourceFile, getLocationNode(sig).getStart());
            reflection.sources ||= [];
            reflection.sources.push(new models_1.SourceReference(fileName, position.line + 1, position.character));
        }
        /**
         * Triggered when the converter begins resolving a project.
         *
         * @param context  The context object describing the current state the converter is in.
         */
        onBeginResolve(context) {
            if (this.disableSources)
                return;
            if (this.disableGit && !this.sourceLinkTemplate) {
                this.application.logger.error(`disableGit is set, but sourceLinkTemplate is not, so source links cannot be produced. Set a sourceLinkTemplate or disableSources to prevent source tracking.`);
                return;
            }
            if (this.disableGit &&
                this.sourceLinkTemplate.includes("{gitRevision}") &&
                !this.gitRevision) {
                this.application.logger.warn(`disableGit is set and sourceLinkTemplate contains {gitRevision}, which will be replaced with an empty string as no revision was provided.`);
            }
            const basePath = this.basePath || (0, utils_1.getCommonDirectory)([...this.fileNames]);
            for (const id in context.project.reflections) {
                const refl = context.project.reflections[id];
                if (!(refl instanceof index_1.DeclarationReflection ||
                    refl instanceof index_1.SignatureReflection)) {
                    continue;
                }
                if (replaceSourcesWithParentSources(refl)) {
                    refl.sources = refl.parent.sources;
                }
                for (const source of refl.sources || []) {
                    if (this.disableGit || (0, repository_1.gitIsInstalled)()) {
                        const repo = this.getRepository(basePath, source.fullFileName);
                        source.url = repo?.getURL(source.fullFileName, source.line);
                    }
                    source.fileName = (0, utils_1.normalizePath)((0, path_1.relative)(basePath, source.fullFileName));
                }
            }
        }
        /**
         * Check whether the given file is placed inside a repository.
         *
         * @param fileName  The name of the file a repository should be looked for.
         * @returns The found repository info or undefined.
         */
        getRepository(basePath, fileName) {
            if (this.disableGit) {
                return new repository_1.AssumedRepository(basePath, this.gitRevision, this.sourceLinkTemplate);
            }
            // Check for known non-repositories
            const dirName = (0, path_1.dirname)(fileName);
            const segments = dirName.split("/");
            for (let i = segments.length; i > 0; i--) {
                if (this.ignoredPaths.has(segments.slice(0, i).join("/"))) {
                    return;
                }
            }
            // Check for known repositories
            for (const path of Object.keys(this.repositories)) {
                if (fileName.toLowerCase().startsWith(path)) {
                    return this.repositories[path];
                }
            }
            // Try to create a new repository
            const repository = repository_1.GitRepository.tryCreateRepository(dirName, this.sourceLinkTemplate, this.gitRevision, this.gitRemote, this.application.logger);
            if (repository) {
                this.repositories[repository.path.toLowerCase()] = repository;
                return repository;
            }
            // No repository found, add path to ignored paths
            this.ignoredPaths.add(dirName);
        }
    };
    _SourcePlugin_disableSources_accessor_storage = new WeakMap();
    _SourcePlugin_gitRevision_accessor_storage = new WeakMap();
    _SourcePlugin_gitRemote_accessor_storage = new WeakMap();
    _SourcePlugin_disableGit_accessor_storage = new WeakMap();
    _SourcePlugin_sourceLinkTemplate_accessor_storage = new WeakMap();
    _SourcePlugin_basePath_accessor_storage = new WeakMap();
    __setFunctionName(_classThis, "SourcePlugin");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        _disableSources_decorators = [(0, utils_1.Option)("disableSources")];
        _gitRevision_decorators = [(0, utils_1.Option)("gitRevision")];
        _gitRemote_decorators = [(0, utils_1.Option)("gitRemote")];
        _disableGit_decorators = [(0, utils_1.Option)("disableGit")];
        _sourceLinkTemplate_decorators = [(0, utils_1.Option)("sourceLinkTemplate")];
        _basePath_decorators = [(0, utils_1.Option)("basePath")];
        __esDecorate(_classThis, null, _disableSources_decorators, { kind: "accessor", name: "disableSources", static: false, private: false, access: { has: obj => "disableSources" in obj, get: obj => obj.disableSources, set: (obj, value) => { obj.disableSources = value; } }, metadata: _metadata }, _disableSources_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _gitRevision_decorators, { kind: "accessor", name: "gitRevision", static: false, private: false, access: { has: obj => "gitRevision" in obj, get: obj => obj.gitRevision, set: (obj, value) => { obj.gitRevision = value; } }, metadata: _metadata }, _gitRevision_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _gitRemote_decorators, { kind: "accessor", name: "gitRemote", static: false, private: false, access: { has: obj => "gitRemote" in obj, get: obj => obj.gitRemote, set: (obj, value) => { obj.gitRemote = value; } }, metadata: _metadata }, _gitRemote_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _disableGit_decorators, { kind: "accessor", name: "disableGit", static: false, private: false, access: { has: obj => "disableGit" in obj, get: obj => obj.disableGit, set: (obj, value) => { obj.disableGit = value; } }, metadata: _metadata }, _disableGit_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _sourceLinkTemplate_decorators, { kind: "accessor", name: "sourceLinkTemplate", static: false, private: false, access: { has: obj => "sourceLinkTemplate" in obj, get: obj => obj.sourceLinkTemplate, set: (obj, value) => { obj.sourceLinkTemplate = value; } }, metadata: _metadata }, _sourceLinkTemplate_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _basePath_decorators, { kind: "accessor", name: "basePath", static: false, private: false, access: { has: obj => "basePath" in obj, get: obj => obj.basePath, set: (obj, value) => { obj.basePath = value; } }, metadata: _metadata }, _basePath_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SourcePlugin = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SourcePlugin = _classThis;
})();
exports.SourcePlugin = SourcePlugin;
function getLocationNode(node) {
    if ((0, nodes_1.isNamedNode)(node))
        return node.name;
    return node;
}
function replaceSourcesWithParentSources(refl) {
    if (refl instanceof index_1.DeclarationReflection || !refl.sources) {
        return false;
    }
    const symbol = refl.project.getSymbolFromReflection(refl.parent);
    if (!symbol?.declarations) {
        return false;
    }
    for (const decl of symbol.declarations) {
        const file = decl.getSourceFile();
        const pos = file.getLineAndCharacterOfPosition(decl.pos);
        const end = file.getLineAndCharacterOfPosition(decl.end);
        if (refl.sources.some((src) => src.fullFileName === file.fileName &&
            pos.line <= src.line - 1 &&
            src.line - 1 <= end.line)) {
            return false;
        }
    }
    return true;
}
