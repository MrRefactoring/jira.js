import { z } from 'zod';

export const EstimationFieldSchema = z.object({
  displayName: z.string().optional(),
  fieldId: z.string().optional(),
});

export type EstimationField = z.infer<typeof EstimationFieldSchema>;
