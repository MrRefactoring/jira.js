export interface SearchAutoComplete {
    /** List of project IDs used to filter the visible field details returned. */
    projectIds?: number[];
    /** Include collapsed fields for fields that have non-unique names. */
    includeCollapsedFields?: boolean;
}
