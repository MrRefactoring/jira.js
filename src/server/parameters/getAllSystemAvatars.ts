import { z } from 'zod';

export const GetAllSystemAvatarsSchema = z.object({
  /** The avatar type */
  type: z.string(),
});

export type GetAllSystemAvatars = z.input<typeof GetAllSystemAvatarsSchema>;
