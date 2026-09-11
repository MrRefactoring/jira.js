import { z } from 'zod';

export const GetAllUserAvatarsSchema = z.object({
  /** Username */
  username: z.string().optional(),
});

export type GetAllUserAvatars = z.input<typeof GetAllUserAvatarsSchema>;
