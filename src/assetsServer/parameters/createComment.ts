import { z } from 'zod';
import { CommentSchema } from '../models';

export const CreateCommentSchema = z.object(CommentSchema.shape);

export type CreateComment = z.input<typeof CreateCommentSchema>;
