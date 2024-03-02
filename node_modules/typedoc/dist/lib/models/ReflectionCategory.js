"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReflectionCategory = void 0;
const comments_1 = require("./comments");
/**
 * A category of reflections.
 *
 * Reflection categories are created by the ´CategoryPlugin´ in the resolving phase
 * of the dispatcher. The main purpose of categories is to be able to more easily
 * render human readable children lists in templates.
 */
class ReflectionCategory {
    /**
     * Create a new ReflectionCategory instance.
     *
     * @param title The title of this category.
     */
    constructor(title) {
        /**
         * All reflections of this category.
         */
        this.children = [];
        this.title = title;
    }
    /**
     * Do all children of this category have a separate document?
     */
    allChildrenHaveOwnDocument() {
        return this.children.every((child) => child.hasOwnDocument);
    }
    toObject(serializer) {
        return {
            title: this.title,
            description: this.description
                ? comments_1.Comment.serializeDisplayParts(serializer, this.description)
                : undefined,
            children: this.children.length > 0
                ? this.children.map((child) => child.id)
                : undefined,
        };
    }
    fromObject(de, obj) {
        if (obj.description) {
            this.description = comments_1.Comment.deserializeDisplayParts(de, obj.description);
        }
        if (obj.children) {
            de.defer((project) => {
                for (const childId of obj.children || []) {
                    const child = project.getReflectionById(de.oldIdToNewId[childId] ?? -1);
                    if (child?.isDeclaration()) {
                        this.children.push(child);
                    }
                }
            });
        }
    }
}
exports.ReflectionCategory = ReflectionCategory;
