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
exports.MarkedPlugin = void 0;
const fs = __importStar(require("fs"));
const Path = __importStar(require("path"));
const Marked = __importStar(require("marked"));
const components_1 = require("../components");
const events_1 = require("../events");
const utils_1 = require("../../utils");
const highlighter_1 = require("../../utils/highlighter");
const html_1 = require("../../utils/html");
/**
 * Implements markdown and relativeURL helpers for templates.
 * @internal
 */
let MarkedPlugin = (() => {
    var _MarkedPlugin_includeSource_accessor_storage, _MarkedPlugin_mediaSource_accessor_storage, _MarkedPlugin_lightTheme_accessor_storage, _MarkedPlugin_darkTheme_accessor_storage;
    let _classDecorators = [(0, components_1.Component)({ name: "marked" })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = components_1.ContextAwareRendererComponent;
    let _instanceExtraInitializers = [];
    let _includeSource_decorators;
    let _includeSource_initializers = [];
    let _mediaSource_decorators;
    let _mediaSource_initializers = [];
    let _lightTheme_decorators;
    let _lightTheme_initializers = [];
    let _darkTheme_decorators;
    let _darkTheme_initializers = [];
    var MarkedPlugin = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            _MarkedPlugin_includeSource_accessor_storage.set(this, (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _includeSource_initializers, void 0)));
            _MarkedPlugin_mediaSource_accessor_storage.set(this, __runInitializers(this, _mediaSource_initializers, void 0));
            _MarkedPlugin_lightTheme_accessor_storage.set(this, __runInitializers(this, _lightTheme_initializers, void 0));
            _MarkedPlugin_darkTheme_accessor_storage.set(this, __runInitializers(this, _darkTheme_initializers, void 0));
            /**
             * The pattern used to find references in markdown.
             */
            this.includePattern = /\[\[include:([^\]]+?)\]\]/g;
            /**
             * The pattern used to find media links.
             */
            this.mediaPattern = /media:\/\/([^ ")\]}]+)/g;
        }
        get includeSource() { return __classPrivateFieldGet(this, _MarkedPlugin_includeSource_accessor_storage, "f"); }
        set includeSource(value) { __classPrivateFieldSet(this, _MarkedPlugin_includeSource_accessor_storage, value, "f"); }
        get mediaSource() { return __classPrivateFieldGet(this, _MarkedPlugin_mediaSource_accessor_storage, "f"); }
        set mediaSource(value) { __classPrivateFieldSet(this, _MarkedPlugin_mediaSource_accessor_storage, value, "f"); }
        get lightTheme() { return __classPrivateFieldGet(this, _MarkedPlugin_lightTheme_accessor_storage, "f"); }
        set lightTheme(value) { __classPrivateFieldSet(this, _MarkedPlugin_lightTheme_accessor_storage, value, "f"); }
        get darkTheme() { return __classPrivateFieldGet(this, _MarkedPlugin_darkTheme_accessor_storage, "f"); }
        set darkTheme(value) { __classPrivateFieldSet(this, _MarkedPlugin_darkTheme_accessor_storage, value, "f"); }
        /**
         * Create a new MarkedPlugin instance.
         */
        initialize() {
            super.initialize();
            this.listenTo(this.owner, events_1.MarkdownEvent.PARSE, this.onParseMarkdown);
        }
        /**
         * Highlight the syntax of the given text using HighlightJS.
         *
         * @param text  The text that should be highlighted.
         * @param lang  The language that should be used to highlight the string.
         * @return A html string with syntax highlighting.
         */
        getHighlighted(text, lang) {
            lang = lang || "typescript";
            lang = lang.toLowerCase();
            if (!(0, highlighter_1.isSupportedLanguage)(lang)) {
                // Extra newline because of the progress bar
                this.application.logger.warn(`
Unsupported highlight language "${lang}" will not be highlighted. Run typedoc --help for a list of supported languages.
target code block :
\t${text.split("\n").join("\n\t")}
source files :${this.sources?.map((source) => `\n\t${source.fileName}`).join()}
output file :
\t${this.outputFileName}`);
                return text;
            }
            return (0, highlighter_1.highlight)(text, lang);
        }
        /**
         * Parse the given markdown string and return the resulting html.
         *
         * @param text  The markdown string that should be parsed.
         * @returns The resulting html string.
         */
        parseMarkdown(text, page) {
            if (this.includes) {
                text = text.replace(this.includePattern, (_match, path) => {
                    path = Path.join(this.includes, path.trim());
                    if ((0, utils_1.isFile)(path)) {
                        const contents = (0, utils_1.readFile)(path);
                        const event = new events_1.MarkdownEvent(events_1.MarkdownEvent.INCLUDE, page, contents, contents);
                        this.owner.trigger(event);
                        return event.parsedText;
                    }
                    else {
                        this.application.logger.warn("Could not find file to include: " + path);
                        return "";
                    }
                });
            }
            if (this.mediaDirectory) {
                text = text.replace(this.mediaPattern, (match, path) => {
                    const fileName = Path.join(this.mediaDirectory, path);
                    if ((0, utils_1.isFile)(fileName)) {
                        return this.getRelativeUrl("media") + "/" + path;
                    }
                    else {
                        this.application.logger.warn("Could not find media file: " + fileName);
                        return match;
                    }
                });
            }
            const event = new events_1.MarkdownEvent(events_1.MarkdownEvent.PARSE, page, text, text);
            this.owner.trigger(event);
            return event.parsedText;
        }
        /**
         * Triggered before the renderer starts rendering a project.
         *
         * @param event  An event object describing the current render operation.
         */
        onBeginRenderer(event) {
            super.onBeginRenderer(event);
            Marked.marked.setOptions(this.createMarkedOptions());
            delete this.includes;
            if (this.includeSource) {
                if (fs.existsSync(this.includeSource) && fs.statSync(this.includeSource).isDirectory()) {
                    this.includes = this.includeSource;
                }
                else {
                    this.application.logger.warn("Could not find provided includes directory: " + this.includeSource);
                }
            }
            if (this.mediaSource) {
                if (fs.existsSync(this.mediaSource) && fs.statSync(this.mediaSource).isDirectory()) {
                    this.mediaDirectory = Path.join(event.outputDirectory, "media");
                    (0, utils_1.copySync)(this.mediaSource, this.mediaDirectory);
                }
                else {
                    this.mediaDirectory = undefined;
                    this.application.logger.warn("Could not find provided media directory: " + this.mediaSource);
                }
            }
        }
        /**
         * Creates an object with options that are passed to the markdown parser.
         *
         * @returns The options object for the markdown parser.
         */
        createMarkedOptions() {
            const markedOptions = (this.application.options.getValue("markedOptions") ?? {});
            // Set some default values if they are not specified via the TypeDoc option
            markedOptions.highlight ??= (text, lang) => this.getHighlighted(text, lang);
            if (!markedOptions.renderer) {
                markedOptions.renderer = new Marked.Renderer();
                markedOptions.renderer.link = (href, title, text) => {
                    // Prefix the #anchor links `#md:`.
                    const target = href?.replace(/^#(?:md:)?(.+)/, "#md:$1") || undefined;
                    return (0, utils_1.renderElement)(utils_1.JSX.createElement("a", { href: target, title: title || undefined },
                        utils_1.JSX.createElement(utils_1.JSX.Raw, { html: text })));
                };
                markedOptions.renderer.heading = (text, level, _, slugger) => {
                    const slug = slugger.slug(text);
                    // Prefix the slug with an extra `md:` to prevent conflicts with TypeDoc's anchors.
                    this.page.pageHeadings.push({
                        link: `#md:${slug}`,
                        text: (0, html_1.getTextContent)(text),
                        level,
                    });
                    const H = `h${level}`;
                    return (0, utils_1.renderElement)(utils_1.JSX.createElement(utils_1.JSX.Fragment, null,
                        utils_1.JSX.createElement("a", { id: `md:${slug}`, class: "tsd-anchor" }),
                        utils_1.JSX.createElement(H, null,
                            utils_1.JSX.createElement("a", { href: `#md:${slug}` },
                                utils_1.JSX.createElement(utils_1.JSX.Raw, { html: text })))));
                };
                markedOptions.renderer.code = renderCode;
            }
            markedOptions.mangle ??= false; // See https://github.com/TypeStrong/typedoc/issues/1395
            return markedOptions;
        }
        /**
         * Triggered when {@link MarkedPlugin} parses a markdown string.
         *
         * @param event
         */
        onParseMarkdown(event) {
            event.parsedText = Marked.marked(event.parsedText);
        }
    };
    _MarkedPlugin_includeSource_accessor_storage = new WeakMap();
    _MarkedPlugin_mediaSource_accessor_storage = new WeakMap();
    _MarkedPlugin_lightTheme_accessor_storage = new WeakMap();
    _MarkedPlugin_darkTheme_accessor_storage = new WeakMap();
    __setFunctionName(_classThis, "MarkedPlugin");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        _includeSource_decorators = [(0, utils_1.Option)("includes")];
        _mediaSource_decorators = [(0, utils_1.Option)("media")];
        _lightTheme_decorators = [(0, utils_1.Option)("lightHighlightTheme")];
        _darkTheme_decorators = [(0, utils_1.Option)("darkHighlightTheme")];
        __esDecorate(_classThis, null, _includeSource_decorators, { kind: "accessor", name: "includeSource", static: false, private: false, access: { has: obj => "includeSource" in obj, get: obj => obj.includeSource, set: (obj, value) => { obj.includeSource = value; } }, metadata: _metadata }, _includeSource_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _mediaSource_decorators, { kind: "accessor", name: "mediaSource", static: false, private: false, access: { has: obj => "mediaSource" in obj, get: obj => obj.mediaSource, set: (obj, value) => { obj.mediaSource = value; } }, metadata: _metadata }, _mediaSource_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _lightTheme_decorators, { kind: "accessor", name: "lightTheme", static: false, private: false, access: { has: obj => "lightTheme" in obj, get: obj => obj.lightTheme, set: (obj, value) => { obj.lightTheme = value; } }, metadata: _metadata }, _lightTheme_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _darkTheme_decorators, { kind: "accessor", name: "darkTheme", static: false, private: false, access: { has: obj => "darkTheme" in obj, get: obj => obj.darkTheme, set: (obj, value) => { obj.darkTheme = value; } }, metadata: _metadata }, _darkTheme_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MarkedPlugin = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MarkedPlugin = _classThis;
})();
exports.MarkedPlugin = MarkedPlugin;
// Basically a copy/paste of Marked's code, with the addition of the button
// https://github.com/markedjs/marked/blob/v4.3.0/src/Renderer.js#L15-L39
function renderCode(code, infostring, escaped) {
    const lang = (infostring || "").match(/\S*/)[0];
    if (this.options.highlight) {
        const out = this.options.highlight(code, lang);
        if (out != null && out !== code) {
            escaped = true;
            code = out;
        }
    }
    code = code.replace(/\n$/, "") + "\n";
    if (!lang) {
        return `<pre><code>${escaped ? code : (0, html_1.escapeHtml)(code)}</code><button>Copy</button></pre>\n`;
    }
    return `<pre><code class="${this.options.langPrefix + (0, html_1.escapeHtml)(lang)}">${escaped ? code : (0, html_1.escapeHtml)(code)}</code><button>Copy</button></pre>\n`;
}
