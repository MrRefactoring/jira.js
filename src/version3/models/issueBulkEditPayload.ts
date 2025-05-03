import type { JiraIssueFields } from './jiraIssueFields';

/** Issue Bulk Edit Payload */
export interface IssueBulkEditPayload {
  editedFieldsInput?: JiraIssueFields;
  /**
   * List of all the field IDs that are to be bulk edited. Each field ID in this list corresponds to a specific
   * attribute of an issue that is set to be modified in the bulk edit operation. The relevant field ID can be obtained
   * by calling the Bulk Edit Get Fields REST API (documentation available on this page itself).
   */
  selectedActions: string[];
  /**
   * List of issue IDs or keys which are to be bulk edited. These IDs or keys can be from different projects and issue
   * types.
   */
  selectedIssueIdsOrKeys: string[];
  /**
   * A boolean value that indicates whether to send a bulk change notification when the issues are being edited.
   *
   * If `true`, dispatches a bulk notification email to users about the updates.
   */
  sendBulkNotification?: boolean;
}
