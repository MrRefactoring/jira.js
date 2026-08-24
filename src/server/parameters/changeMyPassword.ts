import { z } from 'zod';
import { PasswordSchema } from '../models';

export const ChangeMyPasswordSchema = z.object(PasswordSchema.shape);

export type ChangeMyPassword = z.input<typeof ChangeMyPasswordSchema>;
