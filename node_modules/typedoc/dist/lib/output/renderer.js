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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
exports.Renderer = void 0;
/**
 * Holds all logic used render and output the final documentation.
 *
 * The {@link Renderer} class is the central controller within this namespace. When invoked it creates
 * an instance of {@link Theme} which defines the layout of the documentation and fires a
 * series of {@link RendererEvent} events. Instances of {@link BasePlugin} can listen to these events and
 * alter the generated output.
 */
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const events_1 = require("./events");
const fs_1 = require("../utils/fs");
const DefaultTheme_1 = require("./themes/default/DefaultTheme");
const components_1 = require("./components");
const component_1 = require("../utils/component");
const utils_1 = require("../utils");
const highlighter_1 = require("../utils/highlighter");
const models_1 = require("../models");
const type_1 = require("./themes/default/partials/type");
const jsx_1 = require("../utils/jsx");
/**
 * The renderer processes a {@link ProjectReflection} using a {@link Theme} instance and writes
 * the emitted html documents to a output directory. You can specify which theme should be used
 * using the `--theme <name>` command line argument.
 *
 * {@link Renderer} is a subclass of {@link EventDispatcher} and triggers a series of events while
 * a project is being processed. You can listen to these events to control the flow or manipulate
 * the output.
 *
 *  * {@link Renderer.EVENT_BEGIN}<br>
 *    Triggered before the renderer starts rendering a project. The listener receives
 *    an instance of {@link RendererEvent}. By calling {@link RendererEvent.preventDefault} the entire
 *    render process can be canceled.
 *
 *    * {@link Renderer.EVENT_BEGIN_PAGE}<br>
 *      Triggered before a document will be rendered. The listener receives an instance of
 *      {@link PageEvent}. By calling {@link PageEvent.preventDefault} the generation of the
 *      document can be canceled.
 *
 *    * {@link Renderer.EVENT_END_PAGE}<br>
 *      Triggered after a document has been rendered, just before it is written to disc. The
 *      listener receives an instance of {@link PageEvent}. When calling
 *      {@link PageEvent.preventDefault} the the document will not be saved to disc.
 *
 *  * {@link Renderer.EVENT_END}<br>
 *    Triggered after the renderer has written all documents. The listener receives
 *    an instance of {@link RendererEvent}.
 *
 * * {@link Renderer.EVENT_PREPARE_INDEX}<br>
 *    Triggered when the JavascriptIndexPlugin is preparing the search index. Listeners receive
 *    an instance of {@link IndexEvent}.
 */
let Renderer = (() => {
    var _Renderer_themeName_accessor_storage, _Renderer_cleanOutputDir_accessor_storage, _Renderer_cname_accessor_storage, _Renderer_githubPages_accessor_storage, _Renderer_cacheBust_accessor_storage, _Renderer_lightTheme_accessor_storage, _Renderer_darkTheme_accessor_storage, _Renderer_pretty_accessor_storage;
    let _classDecorators = [(0, component_1.Component)({ name: "renderer", internal: true, childClass: components_1.RendererComponent })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = component_1.ChildableComponent;
    let _instanceExtraInitializers = [];
    let _themeName_decorators;
    let _themeName_initializers = [];
    let _cleanOutputDir_decorators;
    let _cleanOutputDir_initializers = [];
    let _cname_decorators;
    let _cname_initializers = [];
    let _githubPages_decorators;
    let _githubPages_initializers = [];
    let _cacheBust_decorators;
    let _cacheBust_initializers = [];
    let _lightTheme_decorators;
    let _lightTheme_initializers = [];
    let _darkTheme_decorators;
    let _darkTheme_initializers = [];
    let _pretty_decorators;
    let _pretty_initializers = [];
    var Renderer = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.themes = (__runInitializers(this, _instanceExtraInitializers), new Map([
                ["default", DefaultTheme_1.DefaultTheme],
            ]));
            /**
             * A list of async jobs which must be completed *before* rendering output.
             * They will be called after {@link RendererEvent.BEGIN} has fired, but before any files have been written.
             *
             * This may be used by plugins to register work that must be done to prepare output files. For example: asynchronously
             * transform markdown to HTML.
             *
             * Note: This array is cleared after calling the contained functions on each {@link Renderer.render} call.
             */
            this.preRenderAsyncJobs = [];
            /**
             * A list of async jobs which must be completed after rendering output files but before generation is considered successful.
             * These functions will be called after all documents have been written to the filesystem.
             *
             * This may be used by plugins to register work that must be done to finalize output files. For example: asynchronously
             * generating an image referenced in a render hook.
             *
             * Note: This array is cleared after calling the contained functions on each {@link Renderer.render} call.
             */
            this.postRenderAsyncJobs = [];
            /**
             * Hooks which will be called when rendering pages.
             * Note:
             * - Hooks added during output will be discarded at the end of rendering.
             * - Hooks added during a page render will be discarded at the end of that page's render.
             *
             * See {@link RendererHooks} for a description of each available hook, and when it will be called.
             */
            this.hooks = new utils_1.EventHooks();
            _Renderer_themeName_accessor_storage.set(this, __runInitializers(this, _themeName_initializers, void 0));
            _Renderer_cleanOutputDir_accessor_storage.set(this, __runInitializers(this, _cleanOutputDir_initializers, void 0));
            _Renderer_cname_accessor_storage.set(this, __runInitializers(this, _cname_initializers, void 0));
            _Renderer_githubPages_accessor_storage.set(this, __runInitializers(this, _githubPages_initializers, void 0));
            _Renderer_cacheBust_accessor_storage.set(this, __runInitializers(this, _cacheBust_initializers, void 0));
            _Renderer_lightTheme_accessor_storage.set(this, __runInitializers(this, _lightTheme_initializers, void 0));
            _Renderer_darkTheme_accessor_storage.set(this, __runInitializers(this, _darkTheme_initializers, void 0));
            _Renderer_pretty_accessor_storage.set(this, __runInitializers(this, _pretty_initializers, void 0));
            this.renderStartTime = -1;
        }
        /** @internal */
        get themeName() { return __classPrivateFieldGet(this, _Renderer_themeName_accessor_storage, "f"); }
        set themeName(value) { __classPrivateFieldSet(this, _Renderer_themeName_accessor_storage, value, "f"); }
        /** @internal */
        get cleanOutputDir() { return __classPrivateFieldGet(this, _Renderer_cleanOutputDir_accessor_storage, "f"); }
        set cleanOutputDir(value) { __classPrivateFieldSet(this, _Renderer_cleanOutputDir_accessor_storage, value, "f"); }
        /** @internal */
        get cname() { return __classPrivateFieldGet(this, _Renderer_cname_accessor_storage, "f"); }
        set cname(value) { __classPrivateFieldSet(this, _Renderer_cname_accessor_storage, value, "f"); }
        /** @internal */
        get githubPages() { return __classPrivateFieldGet(this, _Renderer_githubPages_accessor_storage, "f"); }
        set githubPages(value) { __classPrivateFieldSet(this, _Renderer_githubPages_accessor_storage, value, "f"); }
        /** @internal */
        get cacheBust() { return __classPrivateFieldGet(this, _Renderer_cacheBust_accessor_storage, "f"); }
        set cacheBust(value) { __classPrivateFieldSet(this, _Renderer_cacheBust_accessor_storage, value, "f"); }
        /** @internal */
        get lightTheme() { return __classPrivateFieldGet(this, _Renderer_lightTheme_accessor_storage, "f"); }
        set lightTheme(value) { __classPrivateFieldSet(this, _Renderer_lightTheme_accessor_storage, value, "f"); }
        /** @internal */
        get darkTheme() { return __classPrivateFieldGet(this, _Renderer_darkTheme_accessor_storage, "f"); }
        set darkTheme(value) { __classPrivateFieldSet(this, _Renderer_darkTheme_accessor_storage, value, "f"); }
        /** @internal */
        get pretty() { return __classPrivateFieldGet(this, _Renderer_pretty_accessor_storage, "f"); }
        set pretty(value) { __classPrivateFieldSet(this, _Renderer_pretty_accessor_storage, value, "f"); }
        /**
         * Define a new theme that can be used to render output.
         * This API will likely be changing at some point, to allow more easily overriding parts of the theme without
         * requiring additional boilerplate.
         * @param name
         * @param theme
         */
        defineTheme(name, theme) {
            if (this.themes.has(name)) {
                throw new Error(`The theme "${name}" has already been defined.`);
            }
            this.themes.set(name, theme);
        }
        /**
         * Render the given project reflection to the specified output directory.
         *
         * @param project  The project that should be rendered.
         * @param outputDirectory  The path of the directory the documentation should be rendered to.
         */
        async render(project, outputDirectory) {
            (0, jsx_1.setRenderSettings)({ pretty: this.pretty });
            const momento = this.hooks.saveMomento();
            this.renderStartTime = Date.now();
            if (!this.prepareTheme() ||
                !(await this.prepareOutputDirectory(outputDirectory))) {
                return;
            }
            const output = new events_1.RendererEvent(events_1.RendererEvent.BEGIN, outputDirectory, project);
            output.urls = this.theme.getUrls(project);
            this.trigger(output);
            await this.runPreRenderJobs(output);
            if (!output.isDefaultPrevented) {
                this.application.logger.verbose(`There are ${output.urls.length} pages to write.`);
                output.urls.forEach((mapping) => {
                    this.renderDocument(...output.createPageEvent(mapping));
                    (0, type_1.validateStateIsClean)(mapping.url);
                });
                await Promise.all(this.postRenderAsyncJobs.map((job) => job(output)));
                this.postRenderAsyncJobs = [];
                this.trigger(events_1.RendererEvent.END, output);
            }
            this.theme = void 0;
            this.hooks.restoreMomento(momento);
        }
        async runPreRenderJobs(output) {
            const start = Date.now();
            this.preRenderAsyncJobs.push(this.loadHighlighter.bind(this));
            await Promise.all(this.preRenderAsyncJobs.map((job) => job(output)));
            this.preRenderAsyncJobs = [];
            this.application.logger.verbose(`Pre render async jobs took ${Date.now() - start}ms`);
        }
        async loadHighlighter() {
            await (0, highlighter_1.loadHighlighter)(this.lightTheme, this.darkTheme);
        }
        /**
         * Render a single page.
         *
         * @param page An event describing the current page.
         * @return TRUE if the page has been saved to disc, otherwise FALSE.
         */
        renderDocument(template, page) {
            const momento = this.hooks.saveMomento();
            this.trigger(events_1.PageEvent.BEGIN, page);
            if (page.isDefaultPrevented) {
                this.hooks.restoreMomento(momento);
                return false;
            }
            if (page.model instanceof models_1.Reflection) {
                page.contents = this.theme.render(page, template);
            }
            else {
                throw new Error("Should be unreachable");
            }
            this.trigger(events_1.PageEvent.END, page);
            this.hooks.restoreMomento(momento);
            if (page.isDefaultPrevented) {
                return false;
            }
            try {
                (0, fs_1.writeFileSync)(page.filename, page.contents);
            }
            catch (error) {
                this.application.logger.error(`Could not write ${page.filename}`);
            }
        }
        /**
         * Ensure that a theme has been setup.
         *
         * If a the user has set a theme we try to find and load it. If no theme has
         * been specified we load the default theme.
         *
         * @returns TRUE if a theme has been setup, otherwise FALSE.
         */
        prepareTheme() {
            if (!this.theme) {
                const ctor = this.themes.get(this.themeName);
                if (!ctor) {
                    this.application.logger.error(`The theme '${this.themeName}' is not defined. The available themes are: ${[
                        ...this.themes.keys(),
                    ].join(", ")}`);
                    return false;
                }
                else {
                    this.theme = new ctor(this);
                }
            }
            return true;
        }
        /**
         * Prepare the output directory. If the directory does not exist, it will be
         * created. If the directory exists, it will be emptied.
         *
         * @param directory  The path to the directory that should be prepared.
         * @returns TRUE if the directory could be prepared, otherwise FALSE.
         */
        async prepareOutputDirectory(directory) {
            if (this.cleanOutputDir) {
                try {
                    await fs.promises.rm(directory, {
                        recursive: true,
                        force: true,
                    });
                }
                catch (error) {
                    this.application.logger.warn("Could not empty the output directory.");
                    return false;
                }
            }
            try {
                fs.mkdirSync(directory, { recursive: true });
            }
            catch (error) {
                this.application.logger.error(`Could not create output directory ${directory}.`);
                return false;
            }
            if (this.githubPages) {
                try {
                    const text = "TypeDoc added this file to prevent GitHub Pages from " +
                        "using Jekyll. You can turn off this behavior by setting " +
                        "the `githubPages` option to false.";
                    fs.writeFileSync(path.join(directory, ".nojekyll"), text);
                }
                catch (error) {
                    this.application.logger.warn("Could not create .nojekyll file.");
                    return false;
                }
            }
            if (this.cname) {
                fs.writeFileSync(path.join(directory, "CNAME"), this.cname);
            }
            return true;
        }
    };
    _Renderer_themeName_accessor_storage = new WeakMap();
    _Renderer_cleanOutputDir_accessor_storage = new WeakMap();
    _Renderer_cname_accessor_storage = new WeakMap();
    _Renderer_githubPages_accessor_storage = new WeakMap();
    _Renderer_cacheBust_accessor_storage = new WeakMap();
    _Renderer_lightTheme_accessor_storage = new WeakMap();
    _Renderer_darkTheme_accessor_storage = new WeakMap();
    _Renderer_pretty_accessor_storage = new WeakMap();
    __setFunctionName(_classThis, "Renderer");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        _themeName_decorators = [(0, utils_1.Option)("theme")];
        _cleanOutputDir_decorators = [(0, utils_1.Option)("cleanOutputDir")];
        _cname_decorators = [(0, utils_1.Option)("cname")];
        _githubPages_decorators = [(0, utils_1.Option)("githubPages")];
        _cacheBust_decorators = [(0, utils_1.Option)("cacheBust")];
        _lightTheme_decorators = [(0, utils_1.Option)("lightHighlightTheme")];
        _darkTheme_decorators = [(0, utils_1.Option)("darkHighlightTheme")];
        _pretty_decorators = [(0, utils_1.Option)("pretty")];
        __esDecorate(_classThis, null, _themeName_decorators, { kind: "accessor", name: "themeName", static: false, private: false, access: { has: obj => "themeName" in obj, get: obj => obj.themeName, set: (obj, value) => { obj.themeName = value; } }, metadata: _metadata }, _themeName_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _cleanOutputDir_decorators, { kind: "accessor", name: "cleanOutputDir", static: false, private: false, access: { has: obj => "cleanOutputDir" in obj, get: obj => obj.cleanOutputDir, set: (obj, value) => { obj.cleanOutputDir = value; } }, metadata: _metadata }, _cleanOutputDir_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _cname_decorators, { kind: "accessor", name: "cname", static: false, private: false, access: { has: obj => "cname" in obj, get: obj => obj.cname, set: (obj, value) => { obj.cname = value; } }, metadata: _metadata }, _cname_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _githubPages_decorators, { kind: "accessor", name: "githubPages", static: false, private: false, access: { has: obj => "githubPages" in obj, get: obj => obj.githubPages, set: (obj, value) => { obj.githubPages = value; } }, metadata: _metadata }, _githubPages_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _cacheBust_decorators, { kind: "accessor", name: "cacheBust", static: false, private: false, access: { has: obj => "cacheBust" in obj, get: obj => obj.cacheBust, set: (obj, value) => { obj.cacheBust = value; } }, metadata: _metadata }, _cacheBust_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _lightTheme_decorators, { kind: "accessor", name: "lightTheme", static: false, private: false, access: { has: obj => "lightTheme" in obj, get: obj => obj.lightTheme, set: (obj, value) => { obj.lightTheme = value; } }, metadata: _metadata }, _lightTheme_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _darkTheme_decorators, { kind: "accessor", name: "darkTheme", static: false, private: false, access: { has: obj => "darkTheme" in obj, get: obj => obj.darkTheme, set: (obj, value) => { obj.darkTheme = value; } }, metadata: _metadata }, _darkTheme_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _pretty_decorators, { kind: "accessor", name: "pretty", static: false, private: false, access: { has: obj => "pretty" in obj, get: obj => obj.pretty, set: (obj, value) => { obj.pretty = value; } }, metadata: _metadata }, _pretty_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Renderer = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    /** @event */
    _classThis.EVENT_BEGIN_PAGE = events_1.PageEvent.BEGIN;
    /** @event */
    _classThis.EVENT_END_PAGE = events_1.PageEvent.END;
    /** @event */
    _classThis.EVENT_BEGIN = events_1.RendererEvent.BEGIN;
    /** @event */
    _classThis.EVENT_END = events_1.RendererEvent.END;
    /** @event */
    _classThis.EVENT_PREPARE_INDEX = events_1.IndexEvent.PREPARE_INDEX;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Renderer = _classThis;
})();
exports.Renderer = Renderer;
// HACK: THIS HAS TO STAY DOWN HERE
// if you try to move it up to the top of the file, then you'll run into stuff being used before it has been defined.
require("./plugins");
