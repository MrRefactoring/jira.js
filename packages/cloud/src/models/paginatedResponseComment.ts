import { z } from 'zod';
import { CommentSchema } from '#/models/comment';

export const PaginatedResponseCommentSchema = z.object({
  maxResults: z.number().optional(),
  results: z.array(CommentSchema).optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
});

export type PaginatedResponseComment = z.infer<typeof PaginatedResponseCommentSchema>;
