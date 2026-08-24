import { z } from 'zod';

export const LoadObjectTypeSchema = z.object({
  id: z.string(),
});

export type LoadObjectType = z.input<typeof LoadObjectTypeSchema>;
