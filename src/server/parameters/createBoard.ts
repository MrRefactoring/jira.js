import { z } from 'zod';
import { BoardCreateSchema } from '../models';

export const CreateBoardSchema = z.object(BoardCreateSchema.shape);

export type CreateBoard = z.input<typeof CreateBoardSchema>;
