/** Represents a piece of content that should be redacted. */
export interface ContentItem {
  /**
   * The ID of the content entity.
   *
   * For redacting an issue field, this will be the field ID (e.g., `summary`, `customfield_10000`). For redacting a
   * comment, this will be the comment ID. For redacting a worklog, this will be the worklog ID.
   */
  entityId: string;

  /**
   * The type of the entity to redact. One of:
   *
   * - **issuefieldvalue** — Redact data in issue fields.
   * - **issue-comment** — Redact data in issue comments.
   * - **issue-worklog** — Redact data in issue worklogs.
   */
  entityType: 'issuefieldvalue' | 'issue-comment' | 'issue-worklog' | string;

  /** The issue ID associated with this content item. */
  id: string;
}
