/** Issue Bulk Move Payload */
export interface IssueBulkMovePayload {
  /**
   * A boolean value that indicates whether to send a bulk change notification when the issues are being moved.
   *
   * If `true`, dispatches a bulk notification email to users about the updates.
   */
  sendBulkNotification?: boolean;
  /**
   * An object representing the mapping of issues and data related to destination entities, like fields and statuses,
   * that are required during a bulk move.
   *
   * The key is a string that is created by concatenating the following three entities in order, separated by commas.
   * The format is `<project ID or key>,<issueType ID>,<parent ID or key>`. It should be unique across mappings provided
   * in the payload. If you provide multiple mappings for the same key, only one will be processed. However, the
   * operation won't fail, so the error may be hard to track down.
   *
   * _**Destination project**_ (Required): ID or key of the project to which the issues are being moved. _**Destination
   * issueType**_ (Required): ID of the issueType to which the issues are being moved. _**Destination parent ID or
   * key**_ (Optional): ID or key of the issue which will become the parent of the issues being moved. Only required
   * when the destination issueType is a subtask.
   */
  targetToSourcesMapping?: unknown;
}
