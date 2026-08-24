import { z } from 'zod';

export const GetIconImageSchema = z.object({
  id: z.string(),
  size: z.number().optional(),
});

export type GetIconImage = z.input<typeof GetIconImageSchema>;
