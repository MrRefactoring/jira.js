import { z } from 'zod';
import { CommentCreateSchema } from '../models';

export const CreateRequestCommentSchema = z.object({}).extend(CommentCreateSchema.shape).extend({
  /** The ID or key of the customer request to which the comment will be added. */
  issueIdOrKey: z.string(),
});

export type CreateRequestComment = z.input<typeof CreateRequestCommentSchema>;
