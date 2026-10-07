import { z } from 'zod';
import { openEnum } from '#/core';
import { CommentJsonSchema } from '../models';

export const AddCommentSchema = z.object(CommentJsonSchema.shape).extend({
  /** Optional flags: renderedBody (provides body rendered in HTML) This parameter accepts a comma-separated list. */
  expand: z.union([openEnum(['renderedBody']), z.array(openEnum(['renderedBody']))]).optional(),
  /** Issue id or key */
  issueIdOrKey: z.string(),
});

export type AddComment = z.input<typeof AddCommentSchema>;
