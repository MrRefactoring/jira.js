export interface DeleteFeatureFlagById {
  /**
   * The ID of the Feature Flag to delete.
   */
  featureFlagId: string;
  /**
   * @deprecated
   */
  _updateSequenceId?: number;
  /**
   * @deprecated
   * This parameter usage is no longer supported.
   *
   * An optional `_updateSequenceId` to use to control deletion.
   *
   * Only stored data with an `updateSequenceId` less than or equal to that provided will be deleted.
   * This can be used help ensure submit/delete requests are applied correctly if issued close together.
   */
  updateSequenceId?: number;
}
