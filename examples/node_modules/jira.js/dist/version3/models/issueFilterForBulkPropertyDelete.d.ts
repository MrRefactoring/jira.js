/** Bulk operation filter details. */
export interface IssueFilterForBulkPropertyDelete {
    /** List of issues to perform the bulk delete operation on. */
    entityIds?: number[];
    /** The value of properties to perform the bulk operation on. */
    currentValue?: any;
}
