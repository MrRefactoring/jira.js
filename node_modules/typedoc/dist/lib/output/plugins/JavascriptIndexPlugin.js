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
exports.JavascriptIndexPlugin = void 0;
const Path = __importStar(require("path"));
const lunr_1 = require("lunr");
const models_1 = require("../../models");
const components_1 = require("../components");
const events_1 = require("../events");
const utils_1 = require("../../utils");
const DefaultTheme_1 = require("../themes/default/DefaultTheme");
const zlib_1 = require("zlib");
const util_1 = require("util");
const gzipP = (0, util_1.promisify)(zlib_1.gzip);
/**
 * A plugin that exports an index of the project to a javascript file.
 *
 * The resulting javascript file can be used to build a simple search function.
 */
let JavascriptIndexPlugin = (() => {
    var _JavascriptIndexPlugin_searchComments_accessor_storage;
    let _classDecorators = [(0, components_1.Component)({ name: "javascript-index" })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = components_1.RendererComponent;
    let _instanceExtraInitializers = [];
    let _searchComments_decorators;
    let _searchComments_initializers = [];
    var JavascriptIndexPlugin = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            _JavascriptIndexPlugin_searchComments_accessor_storage.set(this, (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _searchComments_initializers, void 0)));
        }
        get searchComments() { return __classPrivateFieldGet(this, _JavascriptIndexPlugin_searchComments_accessor_storage, "f"); }
        set searchComments(value) { __classPrivateFieldSet(this, _JavascriptIndexPlugin_searchComments_accessor_storage, value, "f"); }
        /**
         * Create a new JavascriptIndexPlugin instance.
         */
        initialize() {
            this.listenTo(this.owner, events_1.RendererEvent.BEGIN, this.onRendererBegin);
        }
        /**
         * Triggered after a document has been rendered, just before it is written to disc.
         *
         * @param event  An event object describing the current render operation.
         */
        onRendererBegin(event) {
            if (!(this.owner.theme instanceof DefaultTheme_1.DefaultTheme)) {
                return;
            }
            if (event.isDefaultPrevented) {
                return;
            }
            this.owner.preRenderAsyncJobs.push((event) => this.buildSearchIndex(event));
        }
        async buildSearchIndex(event) {
            const theme = this.owner.theme;
            const rows = [];
            const initialSearchResults = Object.values(event.project.reflections).filter((refl) => {
                return (refl instanceof models_1.DeclarationReflection &&
                    refl.url &&
                    refl.name &&
                    !refl.flags.isExternal);
            });
            const indexEvent = new events_1.IndexEvent(events_1.IndexEvent.PREPARE_INDEX, initialSearchResults);
            this.owner.trigger(indexEvent);
            if (indexEvent.isDefaultPrevented) {
                return;
            }
            const builder = new lunr_1.Builder();
            builder.pipeline.add(lunr_1.trimmer);
            builder.ref("id");
            for (const [key, boost] of Object.entries(indexEvent.searchFieldWeights)) {
                builder.field(key, { boost });
            }
            for (const reflection of indexEvent.searchResults) {
                if (!reflection.url) {
                    continue;
                }
                const boost = reflection.relevanceBoost ?? 1;
                if (boost <= 0) {
                    continue;
                }
                let parent = reflection.parent;
                if (parent instanceof models_1.ProjectReflection) {
                    parent = undefined;
                }
                const row = {
                    kind: reflection.kind,
                    name: reflection.name,
                    url: reflection.url,
                    classes: theme.getReflectionClasses(reflection),
                };
                if (parent) {
                    row.parent = parent.getFullName();
                }
                builder.add({
                    name: reflection.name,
                    comment: this.getCommentSearchText(reflection),
                    ...indexEvent.searchFields[rows.length],
                    id: rows.length,
                }, { boost });
                rows.push(row);
            }
            const index = builder.build();
            const jsonFileName = Path.join(event.outputDirectory, "assets", "search.js");
            const jsonData = JSON.stringify({
                rows,
                index,
            });
            const data = await gzipP(Buffer.from(jsonData));
            await (0, utils_1.writeFile)(jsonFileName, `window.searchData = "data:application/octet-stream;base64,${data.toString("base64")}";`);
        }
        getCommentSearchText(reflection) {
            if (!this.searchComments)
                return;
            const comments = [];
            if (reflection.comment)
                comments.push(reflection.comment);
            reflection.signatures?.forEach((s) => s.comment && comments.push(s.comment));
            reflection.getSignature?.comment &&
                comments.push(reflection.getSignature.comment);
            reflection.setSignature?.comment &&
                comments.push(reflection.setSignature.comment);
            if (!comments.length) {
                return;
            }
            return comments
                .flatMap((c) => {
                return [...c.summary, ...c.blockTags.flatMap((t) => t.content)];
            })
                .map((part) => part.text)
                .join("\n");
        }
    };
    _JavascriptIndexPlugin_searchComments_accessor_storage = new WeakMap();
    __setFunctionName(_classThis, "JavascriptIndexPlugin");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        _searchComments_decorators = [(0, utils_1.Option)("searchInComments")];
        __esDecorate(_classThis, null, _searchComments_decorators, { kind: "accessor", name: "searchComments", static: false, private: false, access: { has: obj => "searchComments" in obj, get: obj => obj.searchComments, set: (obj, value) => { obj.searchComments = value; } }, metadata: _metadata }, _searchComments_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        JavascriptIndexPlugin = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return JavascriptIndexPlugin = _classThis;
})();
exports.JavascriptIndexPlugin = JavascriptIndexPlugin;
