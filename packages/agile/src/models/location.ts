import { z } from 'zod';

export const LocationSchema = z.object({
  projectKeyOrId: z.string().optional(),
  type: z.enum(['project', 'user']).optional(),
});

export type Location = z.infer<typeof LocationSchema>;
