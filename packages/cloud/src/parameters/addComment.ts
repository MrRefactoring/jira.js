import { z } from 'zod';
import { CommentSchema } from '../models';

export const AddCommentSchema = z
  .object({
    /** The ID or key of the issue. */
    issueIdOrKey: z.string(),
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

export type AddComment = z.input<typeof AddCommentSchema>;
