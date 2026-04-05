import { z } from 'zod';

export const EstimationConfigSchema = z.object({
  field: z
    .object({
      displayName: z.string().optional(),
      fieldId: z.string().optional(),
    })
    .optional(),
  type: z.string().optional(),
});

export type EstimationConfig = z.infer<typeof EstimationConfigSchema>;
