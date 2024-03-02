"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.PackagePlugin = void 0;
const Path = __importStar(require("path"));
const components_1 = require("../components");
const converter_1 = require("../converter");
const utils_1 = require("../../utils");
const fs_1 = require("../../utils/fs");
const paths_1 = require("../../utils/paths");
const minimalSourceFile_1 = require("../../utils/minimalSourceFile");
const application_events_1 = require("../../application-events");
const path_1 = require("path");
/**
 * A handler that tries to find the package.json and readme.md files of the
 * current project.
 */
let PackagePlugin = (() => {
    var _PackagePlugin_readme_accessor_storage, _PackagePlugin_stripYamlFrontmatter_accessor_storage, _PackagePlugin_entryPointStrategy_accessor_storage, _PackagePlugin_entryPoints_accessor_storage, _PackagePlugin_includeVersion_accessor_storage;
    let _classDecorators = [(0, components_1.Component)({ name: "package" })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = components_1.ConverterComponent;
    let _instanceExtraInitializers = [];
    let _readme_decorators;
    let _readme_initializers = [];
    let _stripYamlFrontmatter_decorators;
    let _stripYamlFrontmatter_initializers = [];
    let _entryPointStrategy_decorators;
    let _entryPointStrategy_initializers = [];
    let _entryPoints_decorators;
    let _entryPoints_initializers = [];
    let _includeVersion_decorators;
    let _includeVersion_initializers = [];
    var PackagePlugin = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            _PackagePlugin_readme_accessor_storage.set(this, (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _readme_initializers, void 0)));
            _PackagePlugin_stripYamlFrontmatter_accessor_storage.set(this, __runInitializers(this, _stripYamlFrontmatter_initializers, void 0));
            _PackagePlugin_entryPointStrategy_accessor_storage.set(this, __runInitializers(this, _entryPointStrategy_initializers, void 0));
            _PackagePlugin_entryPoints_accessor_storage.set(this, __runInitializers(this, _entryPoints_initializers, void 0));
            _PackagePlugin_includeVersion_accessor_storage.set(this, __runInitializers(this, _includeVersion_initializers, void 0));
        }
        get readme() { return __classPrivateFieldGet(this, _PackagePlugin_readme_accessor_storage, "f"); }
        set readme(value) { __classPrivateFieldSet(this, _PackagePlugin_readme_accessor_storage, value, "f"); }
        get stripYamlFrontmatter() { return __classPrivateFieldGet(this, _PackagePlugin_stripYamlFrontmatter_accessor_storage, "f"); }
        set stripYamlFrontmatter(value) { __classPrivateFieldSet(this, _PackagePlugin_stripYamlFrontmatter_accessor_storage, value, "f"); }
        get entryPointStrategy() { return __classPrivateFieldGet(this, _PackagePlugin_entryPointStrategy_accessor_storage, "f"); }
        set entryPointStrategy(value) { __classPrivateFieldSet(this, _PackagePlugin_entryPointStrategy_accessor_storage, value, "f"); }
        get entryPoints() { return __classPrivateFieldGet(this, _PackagePlugin_entryPoints_accessor_storage, "f"); }
        set entryPoints(value) { __classPrivateFieldSet(this, _PackagePlugin_entryPoints_accessor_storage, value, "f"); }
        get includeVersion() { return __classPrivateFieldGet(this, _PackagePlugin_includeVersion_accessor_storage, "f"); }
        set includeVersion(value) { __classPrivateFieldSet(this, _PackagePlugin_includeVersion_accessor_storage, value, "f"); }
        initialize() {
            this.listenTo(this.owner, {
                [converter_1.Converter.EVENT_BEGIN]: this.onBegin,
                [converter_1.Converter.EVENT_RESOLVE_BEGIN]: this.onBeginResolve,
                [converter_1.Converter.EVENT_END]: () => {
                    delete this.readmeFile;
                    delete this.readmeContents;
                    delete this.packageJson;
                },
            });
            this.listenTo(this.application, {
                [application_events_1.ApplicationEvents.REVIVE]: this.onRevive,
            });
        }
        onRevive(project) {
            this.onBegin();
            this.addEntries(project);
            delete this.readmeFile;
            delete this.packageJson;
            delete this.readmeContents;
        }
        onBegin() {
            this.readmeFile = undefined;
            this.readmeContents = undefined;
            this.packageJson = undefined;
            const entryFiles = this.entryPointStrategy === utils_1.EntryPointStrategy.Packages
                ? this.entryPoints.map((d) => (0, path_1.join)(d, "package.json"))
                : this.entryPoints;
            const dirName = this.application.options.packageDir ??
                Path.resolve((0, fs_1.deriveRootDir)(entryFiles));
            this.application.logger.verbose(`Begin readme.md/package.json search at ${(0, paths_1.nicePath)(dirName)}`);
            this.packageJson = (0, fs_1.discoverPackageJson)(dirName)?.content;
            // Path will be resolved already. This is kind of ugly, but...
            if (this.readme.endsWith("none")) {
                return; // No readme, we're done
            }
            if (this.readme) {
                // Readme path provided, read only that file.
                try {
                    this.readmeContents = this.processReadmeContents((0, utils_1.readFile)(this.readme));
                    this.readmeFile = this.readme;
                }
                catch {
                    this.application.logger.error(`Provided README path, ${(0, paths_1.nicePath)(this.readme)} could not be read.`);
                }
            }
            else {
                // No readme provided, automatically find the readme
                const result = (0, fs_1.discoverInParentDir)("readme.md", dirName, (content) => content);
                if (result) {
                    this.readmeFile = result.file;
                    this.readmeContents = this.processReadmeContents(result.content);
                }
            }
        }
        processReadmeContents(contents) {
            if (this.stripYamlFrontmatter) {
                return contents.replace(/^\s*---\r?\n[\s\S]*?\r?\n---\s*?\r?\n\s*/, "");
            }
            return contents;
        }
        onBeginResolve(context) {
            this.addEntries(context.project);
        }
        addEntries(project) {
            if (this.readmeFile && this.readmeContents) {
                const comment = this.application.converter.parseRawComment(new minimalSourceFile_1.MinimalSourceFile(this.readmeContents, this.readmeFile));
                if (comment.blockTags.length || comment.modifierTags.size) {
                    const ignored = [
                        ...comment.blockTags.map((tag) => tag.tag),
                        ...comment.modifierTags,
                    ];
                    this.application.logger.warn(`Block and modifier tags will be ignored within the readme:\n\t${ignored.join("\n\t")}`);
                }
                project.readme = comment.summary;
            }
            if (this.packageJson) {
                project.packageName = this.packageJson.name;
                if (!project.name) {
                    project.name = project.packageName || "Documentation";
                }
                if (this.includeVersion) {
                    project.packageVersion = this.packageJson.version?.replace(/^v/, "");
                }
            }
            else if (!project.name) {
                this.application.logger.warn('The --name option was not specified, and no package.json was found. Defaulting project name to "Documentation".');
                project.name = "Documentation";
            }
        }
    };
    _PackagePlugin_readme_accessor_storage = new WeakMap();
    _PackagePlugin_stripYamlFrontmatter_accessor_storage = new WeakMap();
    _PackagePlugin_entryPointStrategy_accessor_storage = new WeakMap();
    _PackagePlugin_entryPoints_accessor_storage = new WeakMap();
    _PackagePlugin_includeVersion_accessor_storage = new WeakMap();
    __setFunctionName(_classThis, "PackagePlugin");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        _readme_decorators = [(0, utils_1.Option)("readme")];
        _stripYamlFrontmatter_decorators = [(0, utils_1.Option)("stripYamlFrontmatter")];
        _entryPointStrategy_decorators = [(0, utils_1.Option)("entryPointStrategy")];
        _entryPoints_decorators = [(0, utils_1.Option)("entryPoints")];
        _includeVersion_decorators = [(0, utils_1.Option)("includeVersion")];
        __esDecorate(_classThis, null, _readme_decorators, { kind: "accessor", name: "readme", static: false, private: false, access: { has: obj => "readme" in obj, get: obj => obj.readme, set: (obj, value) => { obj.readme = value; } }, metadata: _metadata }, _readme_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _stripYamlFrontmatter_decorators, { kind: "accessor", name: "stripYamlFrontmatter", static: false, private: false, access: { has: obj => "stripYamlFrontmatter" in obj, get: obj => obj.stripYamlFrontmatter, set: (obj, value) => { obj.stripYamlFrontmatter = value; } }, metadata: _metadata }, _stripYamlFrontmatter_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _entryPointStrategy_decorators, { kind: "accessor", name: "entryPointStrategy", static: false, private: false, access: { has: obj => "entryPointStrategy" in obj, get: obj => obj.entryPointStrategy, set: (obj, value) => { obj.entryPointStrategy = value; } }, metadata: _metadata }, _entryPointStrategy_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _entryPoints_decorators, { kind: "accessor", name: "entryPoints", static: false, private: false, access: { has: obj => "entryPoints" in obj, get: obj => obj.entryPoints, set: (obj, value) => { obj.entryPoints = value; } }, metadata: _metadata }, _entryPoints_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _includeVersion_decorators, { kind: "accessor", name: "includeVersion", static: false, private: false, access: { has: obj => "includeVersion" in obj, get: obj => obj.includeVersion, set: (obj, value) => { obj.includeVersion = value; } }, metadata: _metadata }, _includeVersion_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PackagePlugin = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PackagePlugin = _classThis;
})();
exports.PackagePlugin = PackagePlugin;
