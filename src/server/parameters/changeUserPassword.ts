import { z } from 'zod';
import { PasswordSchema } from '../models';

export const ChangeUserPasswordSchema = z.object(PasswordSchema.shape).extend({
  /** User key */
  key: z.string().optional(),
  /** The username */
  username: z.string().optional(),
});

export type ChangeUserPassword = z.input<typeof ChangeUserPasswordSchema>;
