import { z } from 'zod';

export const WarningCollectionSchema = z.object({
  warnings: z.array(z.string()).optional(),
});

export type WarningCollection = z.infer<typeof WarningCollectionSchema>;
