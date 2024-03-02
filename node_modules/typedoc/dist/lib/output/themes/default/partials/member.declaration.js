"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberDeclaration = void 0;
const utils_1 = require("../../../../utils");
const lib_1 = require("../../lib");
function memberDeclaration(context, props) {
    function renderTypeDeclaration(type) {
        return (utils_1.JSX.createElement("div", { class: "tsd-type-declaration" },
            utils_1.JSX.createElement("h4", null, "Type declaration"),
            context.parameter(type.declaration)));
    }
    const visitor = { reflection: renderTypeDeclaration };
    return (utils_1.JSX.createElement(utils_1.JSX.Fragment, null,
        utils_1.JSX.createElement("div", { class: "tsd-signature" },
            utils_1.JSX.createElement("span", { class: (0, lib_1.getKindClass)(props) }, (0, lib_1.wbr)(props.name)),
            (0, lib_1.renderTypeParametersSignature)(context, props.typeParameters),
            props.type && (utils_1.JSX.createElement(utils_1.JSX.Fragment, null,
                utils_1.JSX.createElement("span", { class: "tsd-signature-symbol" },
                    !!props.flags.isOptional && "?",
                    ":"),
                " ",
                context.type(props.type))),
            !!props.defaultValue && (utils_1.JSX.createElement(utils_1.JSX.Fragment, null,
                utils_1.JSX.createElement("span", { class: "tsd-signature-symbol" },
                    " = ",
                    props.defaultValue)))),
        context.commentSummary(props),
        (0, lib_1.hasTypeParameters)(props) && context.typeParameters(props.typeParameters),
        props.type?.visit({
            reflection: renderTypeDeclaration,
            array: (arr) => arr.elementType.visit(visitor),
            intersection: (int) => int.types.map((t) => t.visit(visitor)),
            union: (union) => union.types.map((t) => t.visit(visitor)),
            reference: (ref) => ref.typeArguments?.map((t) => t.visit(visitor)),
            tuple: (ref) => ref.elements.map((t) => t.visit(visitor)),
        }),
        context.commentTags(props),
        context.memberSources(props)));
}
exports.memberDeclaration = memberDeclaration;
