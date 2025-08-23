import { z } from 'zod';

/** Represents the content to redact */
export const ContentItemSchema = z.object({
  /**
   * The ID of the content entity.
   *
   * - For redacting an issue field, this will be the field ID (e.g., summary, customfield_10000).
   * - For redacting a comment, this will be the comment ID.
   * - For redacting a worklog, this will be the worklog ID.
   */
  entityId: z.string(),
  /**
   * The type of the entity to redact; It will be one of the following:
   *
   * - **issuefieldvalue** - To redact in issue fields
   * - **issue-comment** - To redact in issue comments.
   * - **issue-worklog** - To redact in issue worklogs
   */
  entityType: z.enum(['issuefieldvalue', 'issue-comment', 'issue-worklog']),
  /** This would be the issue ID */
  id: z.string(),
});

export type ContentItem = z.infer<typeof ContentItemSchema>;
