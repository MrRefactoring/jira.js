"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLinks = void 0;
const linkTags = ["@link", "@linkcode", "@linkplain"];
function getBrokenLinks(comment) {
    const links = [];
    function processPart(part) {
        if (part.kind === "inline-tag" &&
            linkTags.includes(part.tag) &&
            !part.target) {
            links.push(part.text);
        }
    }
    comment?.summary.forEach(processPart);
    comment?.blockTags.forEach((tag) => tag.content.forEach(processPart));
    return links;
}
function validateLinks(project, logger) {
    for (const id in project.reflections) {
        const reflection = project.reflections[id];
        for (const broken of getBrokenLinks(reflection.comment)) {
            // #2360, "@" is a future reserved character in TSDoc component paths
            // If a link starts with it, and doesn't include a module source indicator "!"
            // then the user probably is trying to link to a package containing "@" with an absolute link.
            let extra = "";
            if (broken.startsWith("@") && !broken.includes("!")) {
                extra = `\n\tYou may have wanted "${broken.replace(/[.#~]/, "!")}"`;
            }
            logger.warn(`Failed to resolve link to "${broken}" in comment for ${reflection.getFriendlyFullName()}.${extra}`);
        }
    }
}
exports.validateLinks = validateLinks;
