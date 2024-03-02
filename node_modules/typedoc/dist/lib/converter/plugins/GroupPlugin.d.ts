import { ContainerReflection, DeclarationReflection } from "../../models/reflections/index";
import { ReflectionGroup } from "../../models/ReflectionGroup";
import { ConverterComponent } from "../components";
/**
 * A handler that sorts and groups the found reflections in the resolving phase.
 *
 * The handler sets the `groups` property of all container reflections.
 */
export declare class GroupPlugin extends ConverterComponent {
    sortFunction: (reflections: DeclarationReflection[]) => void;
    accessor boosts: Record<string, number>;
    accessor groupOrder: string[];
    accessor sortEntryPoints: boolean;
    usedBoosts: Set<string>;
    static WEIGHTS: string[];
    /**
     * Create a new GroupPlugin instance.
     */
    initialize(): void;
    /**
     * Triggered when the converter has finished resolving a project.
     *
     * @param context  The context object describing the current state the converter is in.
     */
    private onEndResolve;
    private group;
    /**
     * Extracts the groups for a given reflection.
     *
     * @privateRemarks
     * If you change this, also update extractCategories in CategoryPlugin accordingly.
     */
    getGroups(reflection: DeclarationReflection): Set<string>;
    /**
     * Create a grouped representation of the given list of reflections.
     *
     * Reflections are grouped by kind and sorted by weight and name.
     *
     * @param reflections  The reflections that should be grouped.
     * @returns An array containing all children of the given reflection grouped by their kind.
     */
    getReflectionGroups(parent: ContainerReflection, reflections: DeclarationReflection[]): ReflectionGroup[];
    /**
     * Callback used to sort groups by name.
     */
    static sortGroupCallback(a: ReflectionGroup, b: ReflectionGroup): number;
}
