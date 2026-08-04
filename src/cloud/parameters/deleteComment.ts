import { z } from 'zod';

export const DeleteCommentSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The ID of the comment. */
  id: z.string(),
});

export type DeleteComment = z.input<typeof DeleteCommentSchema>;
