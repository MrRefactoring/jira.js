import { z } from 'zod';
import { UserWriteSchema } from '../models';

export const CreateUserSchema = z.object(UserWriteSchema.shape);

export type CreateUser = z.input<typeof CreateUserSchema>;
