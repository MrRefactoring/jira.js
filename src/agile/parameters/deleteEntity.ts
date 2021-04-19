export interface DeleteEntity {
  repositoryId: string;
  entityType: string;
  entityId: string;
  /**
   * @deprecated
   */
  _updateSequenceId?: number;
  /**
   * An optional property to use to control deletion. Only stored data with an updateSequenceId less than or equal to that provided will be deleted. This can be used to help ensure submit/delete requests are applied correctly if they are issued close together.
   */
  updateSequenceId?: number;
}
