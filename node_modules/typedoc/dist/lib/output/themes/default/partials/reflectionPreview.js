"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reflectionPreview = void 0;
const models_1 = require("../../../../models");
const utils_1 = require("../../../../utils");
const lib_1 = require("../../lib");
function reflectionPreview(context, props) {
    if (!(props instanceof models_1.DeclarationReflection))
        return;
    // Each property of the interface will have a member rendered later on the page describing it, so generate
    // a type-like object with links to each member.
    if (props.kindOf(models_1.ReflectionKind.Interface)) {
        return (utils_1.JSX.createElement("div", { class: "tsd-signature" },
            utils_1.JSX.createElement("span", { class: "tsd-signature-keyword" }, "interface "),
            utils_1.JSX.createElement("span", { class: (0, lib_1.getKindClass)(props) }, props.name),
            (0, lib_1.renderTypeParametersSignature)(context, props.typeParameters),
            " ",
            context.type(new models_1.ReflectionType(props), { topLevelLinks: true })));
    }
}
exports.reflectionPreview = reflectionPreview;
