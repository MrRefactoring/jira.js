import { z } from 'zod';

export const DeleteCommentSchema = z.object({
  /** Issue id or key */
  issueIdOrKey: z.string(),
  /** Comment id */
  id: z.string(),
});

export type DeleteComment = z.input<typeof DeleteCommentSchema>;
