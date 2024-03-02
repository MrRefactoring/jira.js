"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reflectionFlags = exports.commentTags = exports.commentSummary = void 0;
const utils_1 = require("../../../../utils");
const models_1 = require("../../../../models");
const lib_1 = require("../../lib");
// Note: Comment modifiers are handled in `renderFlags`
function commentSummary({ markdown }, props) {
    if (!props.comment?.summary.some((part) => part.text))
        return;
    return (utils_1.JSX.createElement("div", { class: "tsd-comment tsd-typography" },
        utils_1.JSX.createElement(utils_1.Raw, { html: markdown(props.comment.summary) })));
}
exports.commentSummary = commentSummary;
function commentTags({ markdown }, props) {
    if (!props.comment)
        return;
    const tags = props.kindOf(models_1.ReflectionKind.SomeSignature)
        ? props.comment.blockTags.filter((tag) => tag.tag !== "@returns")
        : props.comment.blockTags;
    return (utils_1.JSX.createElement("div", { class: "tsd-comment tsd-typography" }, tags.map((item) => {
        const name = item.name
            ? `${(0, lib_1.camelToTitleCase)(item.tag.substring(1))}: ${item.name}`
            : (0, lib_1.camelToTitleCase)(item.tag.substring(1));
        return (utils_1.JSX.createElement(utils_1.JSX.Fragment, null,
            utils_1.JSX.createElement("h4", null, name),
            utils_1.JSX.createElement(utils_1.Raw, { html: markdown(item.content) })));
    })));
}
exports.commentTags = commentTags;
const flagsNotRendered = ["@showCategories", "@showGroups", "@hideCategories", "@hideGroups"];
function reflectionFlags(_context, props) {
    const allFlags = [...props.flags];
    if (props.comment) {
        for (const tag of props.comment.modifierTags) {
            if (!flagsNotRendered.includes(tag)) {
                allFlags.push((0, lib_1.camelToTitleCase)(tag.substring(1)));
            }
        }
    }
    return (utils_1.JSX.createElement(utils_1.JSX.Fragment, null, allFlags.map((item) => (utils_1.JSX.createElement(utils_1.JSX.Fragment, null,
        utils_1.JSX.createElement("code", { class: "tsd-tag ts-flag" + item }, item),
        " ")))));
}
exports.reflectionFlags = reflectionFlags;
