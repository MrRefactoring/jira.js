import { z } from 'zod';
import { apiObject } from '#/core';
import { CommentSchema } from './comment';

export const PaginatedResponseCommentSchema = apiObject({
  maxResults: z.number().optional(),
  results: z.array(CommentSchema).optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
});

export type PaginatedResponseComment = z.infer<typeof PaginatedResponseCommentSchema>;
