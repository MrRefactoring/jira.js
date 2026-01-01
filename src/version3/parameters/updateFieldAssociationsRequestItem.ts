/** Represents an association between a field and its operations. */
export interface UpdateFieldAssociationsRequestItem {
  /**
   * Work types to restrict field to. Replaces any existing work type associations for the field. If not provided, the
   * field is associated to any work types.
   */
  restrictedToWorkTypes?: number[];
  /** Scheme IDs to associate field with */
  schemeIds: number[];
}
