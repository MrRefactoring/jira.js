export interface DeleteFeatureFlagsByProperty {
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
   *
   * If not provided, all stored data that matches the request will be deleted.
   */
  updateSequenceId?: number;
}
