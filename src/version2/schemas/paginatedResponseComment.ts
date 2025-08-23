import { z } from 'zod';
import { CommentSchema } from './comment';

export const PaginatedResponseCommentSchema = z.object({
  maxResults: z.number().int().optional(),
  results: z.array(CommentSchema).optional(),
  startAt: z.number().int().optional(),
  total: z.number().int().optional(),
});

export type PaginatedResponseComment = z.infer<typeof PaginatedResponseCommentSchema>;
