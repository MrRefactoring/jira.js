import { z } from 'zod';
import { apiObject } from '#/core';
import { CommentJsonSchema } from './commentJson';

export const PinnedCommentJsonSchema = apiObject({
  comment: CommentJsonSchema.optional(),
  pinnedBy: z.string().optional(),
  pinnedDate: z.string().optional(),
});

export type PinnedCommentJson = z.infer<typeof PinnedCommentJsonSchema>;
