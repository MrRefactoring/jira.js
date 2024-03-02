"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hierarchyTemplate = void 0;
const utils_1 = require("../../../../utils");
const lib_1 = require("../../lib");
function fullHierarchy(context, root, seen = new Set()) {
    if (seen.has(root))
        return;
    seen.add(root);
    // Note: We don't use root.anchor for the anchor, because those are built on a per page basis.
    // And classes/interfaces get their own page, so all the anchors will be empty anyways.
    // Full name should be safe here, since this list only includes classes/interfaces.
    return (utils_1.JSX.createElement("li", null,
        utils_1.JSX.createElement("a", { id: root.getFullName(), class: "tsd-anchor" }),
        utils_1.JSX.createElement("a", { href: context.urlTo(root) },
            context.icons[root.kind](),
            root.name),
        utils_1.JSX.createElement("ul", null,
            root.implementedBy?.map((child) => {
                return child.reflection && fullHierarchy(context, child.reflection, seen);
            }),
            root.extendedBy?.map((child) => {
                return child.reflection && fullHierarchy(context, child.reflection, seen);
            }))));
}
function hierarchyTemplate(context, props) {
    return (utils_1.JSX.createElement(utils_1.JSX.Fragment, null,
        utils_1.JSX.createElement("h2", null, "Class Hierarchy"),
        (0, lib_1.getHierarchyRoots)(props.project).map((root) => (utils_1.JSX.createElement("ul", { class: "tsd-full-hierarchy" }, fullHierarchy(context, root))))));
}
exports.hierarchyTemplate = hierarchyTemplate;
