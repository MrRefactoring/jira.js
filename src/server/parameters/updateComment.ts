import { z } from 'zod';
import { CommentJsonSchema } from '../models';

export const UpdateCommentSchema = z.object({
  /** Optional flags: renderedBody (provides body rendered in HTML) */
  expand: z.string().optional(),
  /** Issue id or key */
  issueIdOrKey: z.string(),
  /** Comment id */
  id: z.string(),
  body: CommentJsonSchema.optional(),
});

export type UpdateComment = z.input<typeof UpdateCommentSchema>;
