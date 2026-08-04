import { z } from 'zod';
import { CommentCreateSchema } from '../models';

export const CreateRequestCommentSchema = z
  .object({
    /** The ID or key of the customer request to which the comment will be added. */
    issueIdOrKey: z.string(),
  })
  .extend(CommentCreateSchema.shape);

export type CreateRequestComment = z.input<typeof CreateRequestCommentSchema>;
