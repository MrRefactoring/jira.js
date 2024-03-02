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
exports.GroupPlugin = void 0;
const index_1 = require("../../models/reflections/index");
const ReflectionGroup_1 = require("../../models/ReflectionGroup");
const components_1 = require("../components");
const converter_1 = require("../converter");
const sort_1 = require("../../utils/sort");
const utils_1 = require("../../utils");
const models_1 = require("../../models");
/**
 * A handler that sorts and groups the found reflections in the resolving phase.
 *
 * The handler sets the `groups` property of all container reflections.
 */
let GroupPlugin = (() => {
    var _GroupPlugin_boosts_accessor_storage, _GroupPlugin_groupOrder_accessor_storage, _GroupPlugin_sortEntryPoints_accessor_storage;
    let _classDecorators = [(0, components_1.Component)({ name: "group" })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = components_1.ConverterComponent;
    let _instanceExtraInitializers = [];
    let _boosts_decorators;
    let _boosts_initializers = [];
    let _groupOrder_decorators;
    let _groupOrder_initializers = [];
    let _sortEntryPoints_decorators;
    let _sortEntryPoints_initializers = [];
    var GroupPlugin = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.sortFunction = (__runInitializers(this, _instanceExtraInitializers), void 0);
            _GroupPlugin_boosts_accessor_storage.set(this, __runInitializers(this, _boosts_initializers, void 0));
            _GroupPlugin_groupOrder_accessor_storage.set(this, __runInitializers(this, _groupOrder_initializers, void 0));
            _GroupPlugin_sortEntryPoints_accessor_storage.set(this, __runInitializers(this, _sortEntryPoints_initializers, void 0));
            this.usedBoosts = new Set();
        }
        get boosts() { return __classPrivateFieldGet(this, _GroupPlugin_boosts_accessor_storage, "f"); }
        set boosts(value) { __classPrivateFieldSet(this, _GroupPlugin_boosts_accessor_storage, value, "f"); }
        get groupOrder() { return __classPrivateFieldGet(this, _GroupPlugin_groupOrder_accessor_storage, "f"); }
        set groupOrder(value) { __classPrivateFieldSet(this, _GroupPlugin_groupOrder_accessor_storage, value, "f"); }
        get sortEntryPoints() { return __classPrivateFieldGet(this, _GroupPlugin_sortEntryPoints_accessor_storage, "f"); }
        set sortEntryPoints(value) { __classPrivateFieldSet(this, _GroupPlugin_sortEntryPoints_accessor_storage, value, "f"); }
        /**
         * Create a new GroupPlugin instance.
         */
        initialize() {
            this.listenTo(this.owner, {
                [converter_1.Converter.EVENT_RESOLVE_BEGIN]: () => {
                    this.sortFunction = (0, sort_1.getSortFunction)(this.application.options);
                    GroupPlugin.WEIGHTS = this.groupOrder;
                },
                [converter_1.Converter.EVENT_RESOLVE_END]: this.onEndResolve,
            }, undefined, -100);
        }
        /**
         * Triggered when the converter has finished resolving a project.
         *
         * @param context  The context object describing the current state the converter is in.
         */
        onEndResolve(context) {
            this.group(context.project);
            for (const id in context.project.reflections) {
                const reflection = context.project.reflections[id];
                if (reflection instanceof index_1.ContainerReflection) {
                    this.group(reflection);
                }
            }
            const unusedBoosts = new Set(Object.keys(this.boosts));
            for (const boost of this.usedBoosts) {
                unusedBoosts.delete(boost);
            }
            this.usedBoosts.clear();
            if (unusedBoosts.size &&
                this.application.options.isSet("searchGroupBoosts")) {
                context.logger.warn(`Not all groups specified in searchGroupBoosts were used in the documentation.` +
                    ` The unused groups were:\n\t${Array.from(unusedBoosts).join("\n\t")}`);
            }
        }
        group(reflection) {
            if (reflection.children &&
                reflection.children.length > 0 &&
                !reflection.groups) {
                if (this.sortEntryPoints ||
                    !reflection.children.some((c) => c.kindOf(index_1.ReflectionKind.Module))) {
                    this.sortFunction(reflection.children);
                }
                reflection.groups = this.getReflectionGroups(reflection, reflection.children);
            }
        }
        /**
         * Extracts the groups for a given reflection.
         *
         * @privateRemarks
         * If you change this, also update extractCategories in CategoryPlugin accordingly.
         */
        getGroups(reflection) {
            const groups = new Set();
            function extractGroupTags(comment) {
                if (!comment)
                    return;
                (0, utils_1.removeIf)(comment.blockTags, (tag) => {
                    if (tag.tag === "@group") {
                        groups.add(models_1.Comment.combineDisplayParts(tag.content).trim());
                        return true;
                    }
                    return false;
                });
            }
            extractGroupTags(reflection.comment);
            for (const sig of reflection.getNonIndexSignatures()) {
                extractGroupTags(sig.comment);
            }
            if (reflection.type?.type === "reflection") {
                extractGroupTags(reflection.type.declaration.comment);
                for (const sig of reflection.type.declaration.getNonIndexSignatures()) {
                    extractGroupTags(sig.comment);
                }
            }
            groups.delete("");
            if (groups.size === 0) {
                groups.add(index_1.ReflectionKind.pluralString(reflection.kind));
            }
            for (const group of groups) {
                if (group in this.boosts) {
                    this.usedBoosts.add(group);
                    reflection.relevanceBoost =
                        (reflection.relevanceBoost ?? 1) * this.boosts[group];
                }
            }
            return groups;
        }
        /**
         * Create a grouped representation of the given list of reflections.
         *
         * Reflections are grouped by kind and sorted by weight and name.
         *
         * @param reflections  The reflections that should be grouped.
         * @returns An array containing all children of the given reflection grouped by their kind.
         */
        getReflectionGroups(parent, reflections) {
            const groups = new Map();
            reflections.forEach((child) => {
                for (const name of this.getGroups(child)) {
                    let group = groups.get(name);
                    if (!group) {
                        group = new ReflectionGroup_1.ReflectionGroup(name, child);
                        groups.set(name, group);
                    }
                    group.children.push(child);
                }
            });
            if (parent.comment) {
                (0, utils_1.removeIf)(parent.comment.blockTags, (tag) => {
                    if (tag.tag === "@groupDescription") {
                        const { header, body } = models_1.Comment.splitPartsToHeaderAndBody(tag.content);
                        const cat = groups.get(header);
                        if (cat) {
                            cat.description = body;
                        }
                        else {
                            this.application.logger.warn(`Comment for ${parent.getFriendlyFullName()} includes @groupDescription for "${header}", but no child is placed in that group.`);
                        }
                        return true;
                    }
                    return false;
                });
            }
            return Array.from(groups.values()).sort(GroupPlugin.sortGroupCallback);
        }
        /**
         * Callback used to sort groups by name.
         */
        static sortGroupCallback(a, b) {
            let aWeight = GroupPlugin.WEIGHTS.indexOf(a.title);
            let bWeight = GroupPlugin.WEIGHTS.indexOf(b.title);
            if (aWeight === -1 || bWeight === -1) {
                let asteriskIndex = GroupPlugin.WEIGHTS.indexOf("*");
                if (asteriskIndex === -1) {
                    asteriskIndex = GroupPlugin.WEIGHTS.length;
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
    };
    _GroupPlugin_boosts_accessor_storage = new WeakMap();
    _GroupPlugin_groupOrder_accessor_storage = new WeakMap();
    _GroupPlugin_sortEntryPoints_accessor_storage = new WeakMap();
    __setFunctionName(_classThis, "GroupPlugin");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        _boosts_decorators = [(0, utils_1.Option)("searchGroupBoosts")];
        _groupOrder_decorators = [(0, utils_1.Option)("groupOrder")];
        _sortEntryPoints_decorators = [(0, utils_1.Option)("sortEntryPoints")];
        __esDecorate(_classThis, null, _boosts_decorators, { kind: "accessor", name: "boosts", static: false, private: false, access: { has: obj => "boosts" in obj, get: obj => obj.boosts, set: (obj, value) => { obj.boosts = value; } }, metadata: _metadata }, _boosts_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _groupOrder_decorators, { kind: "accessor", name: "groupOrder", static: false, private: false, access: { has: obj => "groupOrder" in obj, get: obj => obj.groupOrder, set: (obj, value) => { obj.groupOrder = value; } }, metadata: _metadata }, _groupOrder_initializers, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _sortEntryPoints_decorators, { kind: "accessor", name: "sortEntryPoints", static: false, private: false, access: { has: obj => "sortEntryPoints" in obj, get: obj => obj.sortEntryPoints, set: (obj, value) => { obj.sortEntryPoints = value; } }, metadata: _metadata }, _sortEntryPoints_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GroupPlugin = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.WEIGHTS = [];
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GroupPlugin = _classThis;
})();
exports.GroupPlugin = GroupPlugin;
