export interface DeleteBuildsByProperty {
  /** @deprecated */
  _updateSequenceNumber?: number;
  /**
   * @deprecated This parameter usage is no longer supported.
   *
   *   An optional `_updateSequenceNumber` to use to control deletion.
   *
   *   Only stored data with an `updateSequenceNumber` less than or equal to that provided will be deleted. This can be
   *   used help ensure submit/delete requests are applied correctly if issued close together.
   *
   *   If not provided, all stored data that matches the request will be deleted.
   */
  updateSequenceNumber?: number;
}
