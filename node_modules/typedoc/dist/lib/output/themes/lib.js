"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHierarchyRoots = exports.renderName = exports.camelToTitleCase = exports.renderTypeParametersSignature = exports.hasTypeParameters = exports.classNames = exports.join = exports.wbr = exports.getKindClass = exports.toStyleClass = exports.getDisplayName = exports.stringify = void 0;
const models_1 = require("../../models");
const utils_1 = require("../../utils");
function stringify(data) {
    if (typeof data === "bigint") {
        return data.toString() + "n";
    }
    return JSON.stringify(data);
}
exports.stringify = stringify;
function getDisplayName(refl) {
    let version = "";
    if ((refl instanceof models_1.DeclarationReflection || refl instanceof models_1.ProjectReflection) && refl.packageVersion) {
        version = ` - v${refl.packageVersion}`;
    }
    return `${refl.name}${version}`;
}
exports.getDisplayName = getDisplayName;
function toStyleClass(str) {
    return str.replace(/(\w)([A-Z])/g, (_m, m1, m2) => m1 + "-" + m2).toLowerCase();
}
exports.toStyleClass = toStyleClass;
function getKindClass(refl) {
    if (refl instanceof models_1.ReferenceReflection) {
        return getKindClass(refl.getTargetReflectionDeep());
    }
    return models_1.ReflectionKind.classString(refl.kind);
}
exports.getKindClass = getKindClass;
/**
 * Insert word break tags ``<wbr>`` into the given string.
 *
 * Breaks the given string at ``_``, ``-`` and capital letters.
 *
 * @param str The string that should be split.
 * @return The original string containing ``<wbr>`` tags where possible.
 */
function wbr(str) {
    // TODO surely there is a better way to do this, but I'm tired.
    const ret = [];
    const re = /[\s\S]*?(?:[^_-][_-](?=[^_-])|[^A-Z](?=[A-Z][^A-Z]))/g;
    let match;
    let i = 0;
    while ((match = re.exec(str))) {
        ret.push(match[0], utils_1.JSX.createElement("wbr", null));
        i += match[0].length;
    }
    ret.push(str.slice(i));
    return ret;
}
exports.wbr = wbr;
function join(joiner, list, cb) {
    const result = [];
    for (const item of list) {
        if (result.length > 0) {
            result.push(joiner);
        }
        result.push(cb(item));
    }
    return utils_1.JSX.createElement(utils_1.JSX.Fragment, null, result);
}
exports.join = join;
function classNames(names, extraCss) {
    const css = Object.keys(names)
        .filter((key) => names[key])
        .concat(extraCss || "")
        .join(" ")
        .trim()
        .replace(/\s+/g, " ");
    return css.length ? css : undefined;
}
exports.classNames = classNames;
function hasTypeParameters(reflection) {
    return ((reflection instanceof models_1.DeclarationReflection || reflection instanceof models_1.SignatureReflection) &&
        reflection.typeParameters != null &&
        reflection.typeParameters.length > 0);
}
exports.hasTypeParameters = hasTypeParameters;
function renderTypeParametersSignature(context, typeParameters) {
    if (!typeParameters || typeParameters.length === 0)
        return utils_1.JSX.createElement(utils_1.JSX.Fragment, null);
    const hideParamTypes = context.options.getValue("hideParameterTypesInTitle");
    if (hideParamTypes) {
        return (utils_1.JSX.createElement(utils_1.JSX.Fragment, null,
            utils_1.JSX.createElement("span", { class: "tsd-signature-symbol" }, "<"),
            join(utils_1.JSX.createElement("span", { class: "tsd-signature-symbol" }, ", "), typeParameters, (item) => (utils_1.JSX.createElement(utils_1.JSX.Fragment, null,
                item.flags.isConst && utils_1.JSX.createElement("span", { class: "tsd-signature-keyword" }, "const "),
                item.varianceModifier ? `${item.varianceModifier} ` : "",
                utils_1.JSX.createElement("a", { class: "tsd-signature-type tsd-kind-type-parameter", href: context.urlTo(item) }, item.name)))),
            utils_1.JSX.createElement("span", { class: "tsd-signature-symbol" }, ">")));
    }
    return (utils_1.JSX.createElement(utils_1.JSX.Fragment, null,
        utils_1.JSX.createElement("span", { class: "tsd-signature-symbol" }, "<"),
        join(utils_1.JSX.createElement("span", { class: "tsd-signature-symbol" }, ", "), typeParameters, (item) => (utils_1.JSX.createElement(utils_1.JSX.Fragment, null,
            item.flags.isConst && "const ",
            item.varianceModifier ? `${item.varianceModifier} ` : "",
            utils_1.JSX.createElement("span", { class: "tsd-signature-type tsd-kind-type-parameter" }, item.name),
            !!item.type && (utils_1.JSX.createElement(utils_1.JSX.Fragment, null,
                utils_1.JSX.createElement("span", { class: "tsd-signature-keyword" }, " extends "),
                context.type(item.type)))))),
        utils_1.JSX.createElement("span", { class: "tsd-signature-symbol" }, ">")));
}
exports.renderTypeParametersSignature = renderTypeParametersSignature;
function camelToTitleCase(text) {
    return text.substring(0, 1).toUpperCase() + text.substring(1).replace(/[a-z][A-Z]/g, (x) => `${x[0]} ${x[1]}`);
}
exports.camelToTitleCase = camelToTitleCase;
/**
 * Renders the reflection name with an additional `?` if optional.
 */
function renderName(refl) {
    if (!refl.name) {
        return utils_1.JSX.createElement("em", null, wbr(models_1.ReflectionKind.singularString(refl.kind)));
    }
    if (refl.flags.isOptional) {
        return utils_1.JSX.createElement(utils_1.JSX.Fragment, null,
            wbr(refl.name),
            "?");
    }
    return wbr(refl.name);
}
exports.renderName = renderName;
function getHierarchyRoots(project) {
    const allClasses = project.getReflectionsByKind(models_1.ReflectionKind.ClassOrInterface);
    const roots = allClasses.filter((refl) => {
        // If nobody extends this class, there's no possible hierarchy to display.
        if (!refl.implementedBy && !refl.extendedBy) {
            return false;
        }
        // If we don't extend anything, then we are a root
        if (!refl.implementedTypes && !refl.extendedTypes) {
            return true;
        }
        // We might still be a root, if our extended/implemented types are not included
        // in the documentation.
        const types = [...(refl.implementedTypes || []), ...(refl.extendedTypes || [])];
        return types.every((type) => !type.visit({
            reference(ref) {
                return ref.reflection !== undefined;
            },
        }));
    });
    return roots.sort((a, b) => a.name.localeCompare(b.name));
}
exports.getHierarchyRoots = getHierarchyRoots;
