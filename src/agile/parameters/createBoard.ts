import { z } from 'zod';
import { BoardCreateSchema } from '../models';

export const CreateBoardSchema = z.object({}).extend(BoardCreateSchema.shape);

export type CreateBoard = z.input<typeof CreateBoardSchema>;
