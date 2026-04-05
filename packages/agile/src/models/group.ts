import { z } from 'zod';

export const GroupSchema = z.object({
  name: z.string().optional(),
  self: z.url().optional(),
});

export type Group = z.infer<typeof GroupSchema>;
