"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvePartLinks = exports.resolveLinks = void 0;
const typescript_1 = __importDefault(require("typescript"));
const models_1 = require("../../models");
const declarationReference_1 = require("./declarationReference");
const declarationReferenceResolver_1 = require("./declarationReferenceResolver");
const urlPrefix = /^(http|ftp)s?:\/\//;
function resolveLinks(comment, reflection, externalResolver, options) {
    comment.summary = resolvePartLinks(reflection, comment.summary, externalResolver, options);
    for (const tag of comment.blockTags) {
        tag.content = resolvePartLinks(reflection, tag.content, externalResolver, options);
    }
    if (reflection instanceof models_1.DeclarationReflection && reflection.readme) {
        reflection.readme = resolvePartLinks(reflection, reflection.readme, externalResolver, options);
    }
}
exports.resolveLinks = resolveLinks;
function resolvePartLinks(reflection, parts, externalResolver, options) {
    return parts.flatMap((part) => processPart(reflection, part, externalResolver, options));
}
exports.resolvePartLinks = resolvePartLinks;
function processPart(reflection, part, externalResolver, options) {
    if (part.kind === "inline-tag") {
        if (part.tag === "@link" ||
            part.tag === "@linkcode" ||
            part.tag === "@linkplain") {
            return resolveLinkTag(reflection, part, externalResolver, options);
        }
    }
    return part;
}
function resolveLinkTag(reflection, part, externalResolver, options) {
    let defaultDisplayText = "";
    let pos = 0;
    const end = part.text.length;
    while (pos < end && typescript_1.default.isWhiteSpaceLike(part.text.charCodeAt(pos))) {
        pos++;
    }
    let target;
    // Try to parse a declaration reference if we didn't use the TS symbol for resolution
    const declRef = (0, declarationReference_1.parseDeclarationReference)(part.text, pos, end);
    // Might already know where it should go if useTsLinkResolution is turned on
    if (part.target instanceof models_1.ReflectionSymbolId) {
        const tsTarget = reflection.project.getReflectionFromSymbolId(part.target);
        if (tsTarget) {
            target = tsTarget;
            pos = end;
            defaultDisplayText =
                part.tsLinkText ||
                    (options.preserveLinkText ? part.text : target.name);
        }
        else if (declRef) {
            // If we didn't find a target, we might be pointing to a symbol in another project that will be merged in
            // or some external symbol, so ask external resolvers to try resolution. Don't use regular declaration ref
            // resolution in case it matches something that would have been merged in later.
            const externalResolveResult = externalResolver(declRef[0], reflection, part, part.target instanceof models_1.ReflectionSymbolId
                ? part.target
                : undefined);
            defaultDisplayText = options.preserveLinkText
                ? part.text
                : part.text.substring(0, pos);
            switch (typeof externalResolveResult) {
                case "string":
                    target = externalResolveResult;
                    break;
                case "object":
                    target = externalResolveResult.target;
                    defaultDisplayText =
                        externalResolveResult.caption || defaultDisplayText;
            }
        }
    }
    if (!target && declRef) {
        // Got one, great! Try to resolve the link
        target = (0, declarationReferenceResolver_1.resolveDeclarationReference)(reflection, declRef[0]);
        pos = declRef[1];
        if (target) {
            defaultDisplayText = options.preserveLinkText
                ? part.text
                : target.name;
        }
        else {
            // If we didn't find a link, it might be a @link tag to an external symbol, check that next.
            const externalResolveResult = externalResolver(declRef[0], reflection, part, part.target instanceof models_1.ReflectionSymbolId
                ? part.target
                : undefined);
            defaultDisplayText = options.preserveLinkText
                ? part.text
                : part.text.substring(0, pos);
            switch (typeof externalResolveResult) {
                case "string":
                    target = externalResolveResult;
                    break;
                case "object":
                    target = externalResolveResult.target;
                    defaultDisplayText =
                        externalResolveResult.caption || defaultDisplayText;
            }
        }
    }
    if (!target && urlPrefix.test(part.text)) {
        const wsIndex = part.text.search(/\s/);
        target = wsIndex === -1 ? part.text : part.text.substring(0, wsIndex);
        pos = target.length;
        defaultDisplayText = target;
    }
    // Remaining text after an optional pipe is the link text, so advance
    // until that's consumed.
    while (pos < end && typescript_1.default.isWhiteSpaceLike(part.text.charCodeAt(pos))) {
        pos++;
    }
    if (pos < end && part.text[pos] === "|") {
        pos++;
    }
    if (!target) {
        return part;
    }
    part.target = target;
    part.text =
        part.text.substring(pos).trim() || defaultDisplayText || part.text;
    return part;
}
