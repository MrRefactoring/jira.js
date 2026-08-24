import { z } from 'zod';

export const GetIconSchema = z.object({
  id: z.string(),
});

export type GetIcon = z.input<typeof GetIconSchema>;
