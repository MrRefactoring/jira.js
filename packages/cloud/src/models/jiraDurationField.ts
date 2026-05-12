import { z } from 'zod';

export const JiraDurationFieldSchema = z.object({
  originalEstimateField: z.string(),
});

export type JiraDurationField = z.infer<typeof JiraDurationFieldSchema>;
