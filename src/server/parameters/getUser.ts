import { z } from 'zod';

export const GetUserSchema = z.object({
  /** Whether deleted users should be returned (flag available to users with global ADMIN rights) */
  includeDeleted: z.boolean().optional(),
  /** User key */
  key: z.string().optional(),
  /** The username */
  username: z.string().optional(),
});

export type GetUser = z.input<typeof GetUserSchema>;
