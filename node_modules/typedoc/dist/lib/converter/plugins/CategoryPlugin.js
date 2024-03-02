"use strict";
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
exports.CategoryPlugin = void 0;
const models_1 = require("../../models");
const models_2 = require("../../models");
const components_1 = require("../components");
const converter_1 = require("../converter");
const utils_1 = require("../../utils");
/**
 * A handler that sorts and categorizes the found reflections in the resolving phase.
 *
 * The handler sets the ´category´ property of all reflections.
 */
let CategoryPlugin = (() => {
    var _CategoryPlugin_defaultCategory_accessor_storage, _CategoryPlugin_categoryOrder_accessor_storage, _CategoryPlugin_categorizeByGroup_accessor_storage, _CategoryPlugin_boosts_accessor_storage;
    let _classDecorators = [(0, components_1.Component)({ name: "category" })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = components_1.ConverterComponent;
    let _instanceExtraInitializers = [];
    let _defaultCategory_decorators;
    let _defaultCategory_initializers = [];
    let _categoryOrder_decorators;
    let _categoryOrder_initializers = [];
    let _categorizeByGroup_decorators;
    let _categorizeByGroup_initializers = [];
    let _boosts_decorators;
    let _boosts_initializers = [];
    var CategoryPlugin = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.sortFunction = (__runInitializers(this, _instanceExtraInitializers), void 0);
            _CategoryPlugin_defaultCategory_accessor_storage.set(this, __runInitializers(this, _defaultCategory_initializers, void 0));
            _CategoryPlugin_categoryOrder_accessor_storage.set(this, __runInitializers(this, _categoryOrder_initializers, void 0));
            _CategoryPlugin_categorizeByGroup_accessor_storage.set(this, __runInitializers(this, _categorizeByGroup_initializers, void 0));
            _CategoryPlugin_boosts_accessor_storage.set(this, __runInitializers(this, _boosts_initializers, void 0));
            this.usedBoosts = new Set();
        }
        get defaultCategory() { return __classPrivateFieldGet(this, _CategoryPlugin_defaultCategory_accessor_storage, "f"); }
        set defaultCategory(value) { __classPrivateFieldSet(this, _CategoryPlugin_defaultCategory_accessor_storage, value, "f"); }
        get categoryOrder() { return __classPrivateFieldGet(this, _CategoryPlugin_categoryOrder_accessor_storage, "f"); }
        set categoryOrder(value) { __classPrivateFieldSet(this, _CategoryPlugin_categoryOrder_accessor_storage, value, "f"); }
        get categorizeByGroup() { return __classPrivateFieldGet(this, _CategoryPlugin_categorizeByGroup_accessor_storage, "f"); }
        set categorizeByGroup(value) { __classPrivateFieldSet(this, _CategoryPlugin_categorizeByGroup_accessor_storage, value, "f"); }
        get boosts() { return __classPrivateFieldGet(this, _CategoryPlugin_boosts_accessor_storage, "f"); }
        set boosts(value) { __classPrivateFieldSet(this, _CategoryPlugin_boosts_accessor_storage, value, "f"); }
        /**
         * Create a new CategoryPlugin instance.
         */
        initialize() {
            this.listenTo(this.owner, {
                [converter_1.Converter.EVENT_BEGIN]: this.onBegin,
                [converter_1.Converter.EVENT_RESOLVE_END]: this.onEndResolve,
            }, undefined, -200);
        }
        /**
         * Triggered when the converter begins converting a project.
         */
        onBegin(_context) {
            this.sortFunction = (0, utils_1.getSortFunction)(this.application.options);
            // Set up static properties
            if (this.defaultCategory) {
                CategoryPlugin.defaultCategory = this.defaultCategory;
            }
            if (this.categoryOrder) {
                CategoryPlugin.WEIGHTS = this.categoryOrder;
            }
        }
        /**
         * Triggered when the converter has finished resolving a project.
         *
         * @param context  The context object describing the current state the converter is in.
         */
        onEndResolve(context) {
            const project = context.project;
            this.categorize(project);
            for (const id in project.reflections) {
                const reflection = project.reflections[id];
                if (reflection instanceof models_1.ContainerReflection) {
                    this.categorize(reflection);
                }
            }
            const unusedBoosts = new Set(Object.keys(this.boosts));
            for (const boost of this.usedBoosts) {
                unusedBoosts.delete(boost);
            }
            this.usedBoosts.clear();
            if (unusedBoosts.size) {
                context.logger.warn(`Not all categories specified in searchCategoryBoosts were used in the documentation.` +
                    ` The unused categories were:\n\t${Array.from(unusedBoosts).join("\n\t")}`);
            }
        }
        categorize(obj) {
            if (this.categorizeByGroup) {
                this.groupCategorize(obj);
            }
            else {
                this.lumpCategorize(obj);
            }
        }
        groupCategorize(obj) {
            if (!obj.groups || obj.groups.length === 0) {
                return;
            }
            obj.groups.forEach((group) => {
                if (group.categories)
                    return;
                group.categories = this.getReflectionCategories(obj, group.children);
                if (group.categories && group.categories.length > 1) {
                    group.categories.sort(CategoryPlugin.sortCatCallback);
                }
                else if (group.categories.length === 1 &&
                    group.categories[0].title === CategoryPlugin.defaultCategory) {
                    // no categories if everything is uncategorized
                    group.categories = undefined;
                }
            });
        }
        lumpCategorize(obj) {
            if (!obj.children || obj.children.length === 0 || obj.categories) {
                return;
            }
            obj.categories = this.getReflectionCategories(obj, obj.children);
            if (obj.categories && obj.categories.length > 1) {
                obj.categories.sort(CategoryPlugin.sortCatCallback);
            }
            else if (obj.categories.length === 1 &&
                obj.categories[0].title === CategoryPlugin.defaultCategory) {
                // no categories if everything is uncategorized
                obj.categories = undefined;
            }
        }
        /**
         * Create a categorized representation of the given list of reflections.
         *
         * @param reflections  The reflections that should be categorized.
         * @param categorySearchBoosts A user-supplied map of category titles, for computing a
         *   relevance boost to be used when searching
         * @returns An array containing all children of the given reflection categorized
         */
        getReflectionCategories(parent, reflections) {
            const categories = new Map();
            for (const child of reflections) {
                const childCategories = this.extractCategories(child);
                if (childCategories.size === 0) {
                    childCategories.add(CategoryPlugin.defaultCategory);
                }
                for (const childCat of childCategories) {
                    const category = categories.get(childCat);
                    if (category) {
                        category.children.push(child);
                    }
                    else {
                        const cat = new models_2.ReflectionCategory(childCat);
                        cat.children.push(child);
                        categories.set(childCat, cat);
                    }
                }
            }
            if (parent.comment) {
                (0, utils_1.removeIf)(parent.comment.blockTags, (tag) => {
                    if (tag.tag === "@categoryDescription") {
                        const { header, body } = models_1.Comment.splitPartsToHeaderAndBody(tag.content);
                        const cat = categories.get(header);
                        if (cat) {
                            cat.description = body;
                        }
                        else {
                            this.application.logger.warn(`Comment for ${parent.getFriendlyFullName()} includes @categoryDescription for "${header}", but no child is placed in that category.`);
                        }
                        return true;
                    }
                    return false;
                });
            }
            for (const cat of categories.values()) {
                this.sortFunction(cat.children);
            }
            return Array.from(categories.values());
        }
        /**
         * Return the category of a given reflection.
         *
         * @param reflection The reflection.
         * @returns The category the reflection belongs to
         *
         * @privateRemarks
         * If you change this, also update getGroups in GroupPlugin accordingly.
         */
        extractCategories(reflection) {
            const categories = CategoryPlugin.getCategories(reflection);
            reflection.comment?.removeTags("@category");
            for (const sig of reflection.getNonIndexSignatures()) {
                sig.comment?.removeTags("@category");
            }
            if (reflection.type?.type === "reflection") {
                reflection.type.declaration.comment?.removeTags("@category");
                for (const sig of reflection.type.declaration.getNonIndexSignatures()) {
                    sig.comment?.removeTags("@category");
                }
            }
            categories.delete("");
            for (const cat of categories) {
                if (cat in this.boosts) {
                    this.usedBoosts.add(cat);
                    reflection.relevanceBoost =
                        (reflection.relevanceBoost ?? 1) * this.boosts[cat];
                }
            }
            return categories;
        }
        /**
         * Callback used to sort categories by name.
         *
         * @param a The left reflection to sort.
         * @param b The right reflection to sort.
         * @returns The sorting weight.
         */
        static sortCatCallback(a, b) {
            let aWeight = CategoryPlugin.WEIGHTS.indexOf(a.title);
            let bWeight = CategoryPlugin.WEIGHTS.indexOf(b.title);
            if (aWeight === -1 || bWeight === -1) {
                let asteriskIndex = CategoryPlugin.WEIGHTS.indexOf("*");
                if (asteriskIndex === -1) {
                    asteriskIndex = CategoryPlugin.WEIGHTS.length;
                }
                if (aWeight === -1) {
                    aWeight = asteriskIndex;
                }
                if (bWeight === -1) {
                    bWeight = asteriskIndex;
                }
            }
            if (aWeight === bWeight) {
                return a.title > b.title ? 1 : -1;
            }
            return aWeight - bWeight;
        }
        static getCategories(reflection) {
            const categories = new Set();
            function discoverCategories(comment) {
                if (!comment)
                    return;
                for (const tag of comment.blockTags) {
                    if (tag.tag === "@category") {
                        categories.add(models_1.Comment.combineDisplayParts(tag.content).trim());
                    }
                }
            }
            discoverCategories(reflection.comment);
            for (const sig of reflection.getNonIndexSignatures()) {
                discoverCategories(sig.comment);
            }
            if (reflection.type?.type === "reflection") {
                discoverCategories(reflection.type.declaration.comment);
                for (const sig of reflection.type.declaration.getNonIndexSignatures()) {
                    discoverCategories(sig.comment);
                }
            }
            categories.delete("");
            return categories;
        }
    };
    _CategoryPlugin_defaultCategory_accessor_storage = new WeakMap();
    _CategoryPlugin_categoryOrder_accessor_storage = new WeakMap();
    _CategoryPlugin_categorizeByGroup_accessor_storage = new WeakMap();
    _CategoryPlugin_boosts_accessor_storage = new WeakMap();
    __setFunctionName(_classThis, "CategoryPlugin");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        _defaultCategory_decorators = [(0, utils_1.Option)("defaultCategory")];
        _categoryOrder_decorators = [(0, utils_1.Option)("categoryOrder")];
        _categorizeByGroup_decorators = [(0, utils_1.Option)("categorizeByGroup")];
        _boosts_decorators = [(0, utils_1.Option)("searchCategoryBoosts")];
        __esDecorate(_classThis, null, _defaultCategory_decorators, { kind: "accessor", name: "defaultCategory", static: false, private: false, access: { has: obj => "defaultCategory" in obj, get: obj => obj.defaultCategory, set: (obj, value) => { obj.defaultCategory = value; } }, metadata: _metadata }, _defaultCategory_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _categoryOrder_decorators, { kind: "accessor", name: "categoryOrder", static: false, private: false, access: { has: obj => "categoryOrder" in obj, get: obj => obj.categoryOrder, set: (obj, value) => { obj.categoryOrder = value; } }, metadata: _metadata }, _categoryOrder_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _categorizeByGroup_decorators, { kind: "accessor", name: "categorizeByGroup", static: false, private: false, access: { has: obj => "categorizeByGroup" in obj, get: obj => obj.categorizeByGroup, set: (obj, value) => { obj.categorizeByGroup = value; } }, metadata: _metadata }, _categorizeByGroup_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _boosts_decorators, { kind: "accessor", name: "boosts", static: false, private: false, access: { has: obj => "boosts" in obj, get: obj => obj.boosts, set: (obj, value) => { obj.boosts = value; } }, metadata: _metadata }, _boosts_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CategoryPlugin = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    // For use in static methods
    _classThis.defaultCategory = "Other";
    _classThis.WEIGHTS = [];
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CategoryPlugin = _classThis;
})();
exports.CategoryPlugin = CategoryPlugin;
