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
exports.IconsPlugin = void 0;
const components_1 = require("../components");
const events_1 = require("../events");
const fs_1 = require("../../utils/fs");
const DefaultTheme_1 = require("../themes/default/DefaultTheme");
const path_1 = require("path");
const utils_1 = require("../../utils");
/**
 * Plugin which is responsible for creating an icons.js file that embeds the icon SVGs
 * within the page on page load to reduce page sizes.
 */
let IconsPlugin = (() => {
    let _classDecorators = [(0, components_1.Component)({ name: "icons" })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = components_1.RendererComponent;
    var IconsPlugin = _classThis = class extends _classSuper {
        initialize() {
            this.listenTo(this.owner, {
                [events_1.RendererEvent.BEGIN]: this.onBeginRender,
            });
        }
        onBeginRender(_event) {
            if (this.owner.theme instanceof DefaultTheme_1.DefaultTheme) {
                this.owner.postRenderAsyncJobs.push((event) => this.onRenderEnd(event));
            }
        }
        async onRenderEnd(event) {
            const children = [];
            const icons = this.owner.theme.icons;
            for (const [name, icon] of Object.entries(icons)) {
                children.push(utils_1.JSX.createElement("g", { id: `icon-${name}` }, icon.call(icons).children));
            }
            const svg = (0, utils_1.renderElement)(utils_1.JSX.createElement("svg", { xmlns: "http://www.w3.org/2000/svg" }, children));
            const js = [
                "(function(svg) {",
                "    svg.innerHTML = `" + (0, utils_1.renderElement)(utils_1.JSX.createElement(utils_1.JSX.Fragment, null, children)).replaceAll("`", "\\`") + "`;",
                "    svg.style.display = 'none';",
                "    if (location.protocol === 'file:') {",
                "        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', updateUseElements);",
                "        else updateUseElements()",
                "        function updateUseElements() {",
                "            document.querySelectorAll('use').forEach(el => {",
                "                if (el.getAttribute('href').includes('#icon-')) {",
                "                    el.setAttribute('href', el.getAttribute('href').replace(/.*#/, '#'));",
                "                }",
                "            });",
                "        }",
                "    }",
                "})(document.body.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg')))",
            ].join("\n");
            const svgPath = (0, path_1.join)(event.outputDirectory, "assets/icons.svg");
            const jsPath = (0, path_1.join)(event.outputDirectory, "assets/icons.js");
            await Promise.all([(0, fs_1.writeFile)(svgPath, svg), (0, fs_1.writeFile)(jsPath, js)]);
        }
    };
    __setFunctionName(_classThis, "IconsPlugin");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IconsPlugin = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IconsPlugin = _classThis;
})();
exports.IconsPlugin = IconsPlugin;
