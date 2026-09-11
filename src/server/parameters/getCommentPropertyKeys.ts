import { z } from 'zod';

export const GetCommentPropertyKeysSchema = z.object({
  /** The comment from which keys will be returned. */
  commentId: z.string(),
});

export type GetCommentPropertyKeys = z.input<typeof GetCommentPropertyKeysSchema>;
