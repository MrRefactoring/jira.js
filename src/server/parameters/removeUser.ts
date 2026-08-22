import { z } from 'zod';

export const RemoveUserSchema = z.object({
  /** User key */
  key: z.string().optional(),
  /** The username */
  username: z.string().optional(),
});

export type RemoveUser = z.input<typeof RemoveUserSchema>;
