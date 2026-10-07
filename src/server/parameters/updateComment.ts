import { z } from 'zod';
import { openEnum } from '#/core';
import { CommentJsonSchema } from '../models';

export const UpdateCommentSchema = z.object({
  /** Optional flags: renderedBody (provides body rendered in HTML) This parameter accepts a comma-separated list. */
  expand: z.union([openEnum(['renderedBody']), z.array(openEnum(['renderedBody']))]).optional(),
  /** Issue id or key */
  issueIdOrKey: z.string(),
  /** Comment id */
  id: z.string(),
  body: CommentJsonSchema.optional(),
});

export type UpdateComment = z.input<typeof UpdateCommentSchema>;
