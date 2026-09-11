import { z } from 'zod';
import { CommentJsonSchema } from '../models';

export const AddCommentSchema = z.object(CommentJsonSchema.shape).extend({
  /** Optional flags: renderedBody (provides body rendered in HTML) */
  expand: z.string().optional(),
  /** Issue id or key */
  issueIdOrKey: z.string(),
});

export type AddComment = z.input<typeof AddCommentSchema>;
