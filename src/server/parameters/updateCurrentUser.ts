import { z } from 'zod';
import { UserWriteSchema } from '../models';

export const UpdateCurrentUserSchema = z.object(UserWriteSchema.shape);

export type UpdateCurrentUser = z.input<typeof UpdateCurrentUserSchema>;
