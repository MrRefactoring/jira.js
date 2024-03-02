import { DeclarationReflection } from "../../models";
import { ConverterComponent } from "../components";
/**
 * A handler that sorts and categorizes the found reflections in the resolving phase.
 *
 * The handler sets the ´category´ property of all reflections.
 */
export declare class CategoryPlugin extends ConverterComponent {
    sortFunction: (reflections: DeclarationReflection[]) => void;
    accessor defaultCategory: string;
    accessor categoryOrder: string[];
    accessor categorizeByGroup: boolean;
    accessor boosts: Record<string, number>;
    usedBoosts: Set<string>;
    static defaultCategory: string;
    static WEIGHTS: string[];
    /**
     * Create a new CategoryPlugin instance.
     */
    initialize(): void;
    /**
     * Triggered when the converter begins converting a project.
     */
    private onBegin;
    /**
     * Triggered when the converter has finished resolving a project.
     *
     * @param context  The context object describing the current state the converter is in.
     */
    private onEndResolve;
    private categorize;
    private groupCategorize;
    private lumpCategorize;
    /**
     * Create a categorized representation of the given list of reflections.
     *
     * @param reflections  The reflections that should be categorized.
     * @param categorySearchBoosts A user-supplied map of category titles, for computing a
     *   relevance boost to be used when searching
     * @returns An array containing all children of the given reflection categorized
     */
    private getReflectionCategories;
    /**
     * Return the category of a given reflection.
     *
     * @param reflection The reflection.
     * @returns The category the reflection belongs to
     *
     * @privateRemarks
     * If you change this, also update getGroups in GroupPlugin accordingly.
     */
    private extractCategories;
    /**
     * Callback used to sort categories by name.
     *
     * @param a The left reflection to sort.
     * @param b The right reflection to sort.
     * @returns The sorting weight.
     */
    private static sortCatCallback;
    static getCategories(reflection: DeclarationReflection): Set<string>;
}
