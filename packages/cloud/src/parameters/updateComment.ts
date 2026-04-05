import { z } from 'zod';
import { CommentSchema } from '../models';

export const UpdateCommentSchema = z
  .object({
    /** The ID or key of the issue. */
    issueIdOrKey: z.string(),
    /** The ID of the comment. */
    id: z.string(),
    /** Whether users are notified when a comment is updated. */
    notifyUsers: z.boolean().optional(),
    /**
     * Whether screen security is overridden to enable uneditable fields to be edited. Available to Connect app users
     * with the _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) and Forge apps acting
     * on behalf of users with _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    overrideEditableFlag: z.boolean().optional(),
    /**
     * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#expansion) to include additional
     * information about comments in the response. This parameter accepts `renderedBody`, which returns the comment body
     * rendered in HTML.
     */
    expand: z
      .union([z.string(), z.array(z.string()), z.enum(['renderedBody']), z.array(z.enum(['renderedBody']))])
      .optional(),
  })
  .extend(CommentSchema.shape);

export type UpdateComment = z.input<typeof UpdateCommentSchema>;
