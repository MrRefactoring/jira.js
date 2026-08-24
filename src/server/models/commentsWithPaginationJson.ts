import { z } from 'zod';
import { apiObject } from '#/core';
import { CommentJsonSchema } from './commentJson';

export const CommentsWithPaginationJsonSchema = apiObject({
  comments: z.array(CommentJsonSchema).optional(),
  maxResults: z.number().optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
});

export type CommentsWithPaginationJson = z.infer<typeof CommentsWithPaginationJsonSchema>;
