import { z } from 'zod';
import { NewUserDetailsSchema } from '../models';

export const CreateUserSchema = z.object({}).extend(NewUserDetailsSchema.shape);

export type CreateUser = z.input<typeof CreateUserSchema>;
