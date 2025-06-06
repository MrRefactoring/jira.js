/** The list of status mappings. */
export interface WorkflowAssociationStatusMapping {
  /** The ID of the status in the new workflow. */
  newStatusId: string;
  /** The ID of the status in the old workflow that isn't present in the new workflow. */
  oldStatusId: string;
}
