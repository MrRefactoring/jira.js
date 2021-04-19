export interface DeleteRemoteLinksByProperty {
  /**
   * @deprecated
   */
  _updateSequenceNumber?: number;
  /**
   * @deprecated
   * This parameter usage is no longer supported.
   *
   * An optional `_updateSequenceNumber` to use to control deletion.
   *
   * Only stored data with an `updateSequenceNumber` less than or equal to that provided will be deleted.
   * This can be used help ensure submit/delete requests are applied correctly if issued close together.
   *
   * If not provided, all stored data that matches the request will be deleted.
   */
  updateSequenceNumber?: number;
  /**
   * Free-form query parameters to specify which properties to delete by. Properties refer to the arbitrary
   * information the provider tagged Remote Links with previously.
   *
   * For example, if the provider previously tagged a remote link with accountId:
   *   "properties": {
   *     "accountId": "account-123"
   *   }
   *
   * And now they want to delete Remote Links in bulk by that specific accountId as follows:
   * e.g. DELETE /bulkByProperties?accountId=account-123
   */
  params?: {};
}
