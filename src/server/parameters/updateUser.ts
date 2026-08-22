import { z } from 'zod';
import { UserWriteSchema } from '../models';

export const UpdateUserSchema = z.object({
  /** User key */
  key: z.string().optional(),
  /** The username */
  username: z.string().optional(),
  body: UserWriteSchema,
});

export type UpdateUser = z.input<typeof UpdateUserSchema>;
