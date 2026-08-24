import { z } from 'zod';

export const GetRequestCommentByIdSchema = z.object({
  /** The id or key of the customer request. */
  issueIdOrKey: z.string(),
  /** ID of the comment to retrieve. */
  commentId: z.string(),
});

export type GetRequestCommentById = z.input<typeof GetRequestCommentByIdSchema>;
