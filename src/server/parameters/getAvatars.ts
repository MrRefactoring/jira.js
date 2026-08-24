import { z } from 'zod';

export const GetAvatarsSchema = z.object({
  type: z.string(),
  owningObjectId: z.string(),
});

export type GetAvatars = z.input<typeof GetAvatarsSchema>;
