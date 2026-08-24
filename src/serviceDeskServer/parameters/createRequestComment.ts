import { z } from 'zod';
import { CommentCreateSchema } from '../models';

export const CreateRequestCommentSchema = z.object(CommentCreateSchema.shape).extend({
  /** The id or key of the customer request. */
  issueIdOrKey: z.string(),
});

export type CreateRequestComment = z.input<typeof CreateRequestCommentSchema>;
