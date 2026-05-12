import { z } from 'zod';

export const GetCommentPropertyKeysSchema = z.object({
  /** The ID of the comment. */
  commentId: z.string(),
});

export type GetCommentPropertyKeys = z.input<typeof GetCommentPropertyKeysSchema>;
