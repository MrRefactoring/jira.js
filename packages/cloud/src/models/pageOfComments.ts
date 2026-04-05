import { z } from 'zod';
import { CommentSchema } from '#/models/comment';

/** A page of comments. */
export const PageOfCommentsSchema = z.object({
  /** The list of comments. */
  comments: z.array(CommentSchema).optional(),
  /** The maximum number of items that could be returned. */
  maxResults: z.number().optional(),
  /** The index of the first item returned. */
  startAt: z.number().optional(),
  /** The number of items returned. */
  total: z.number().optional(),
});

export type PageOfComments = z.infer<typeof PageOfCommentsSchema>;
