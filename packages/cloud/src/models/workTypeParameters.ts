import { z } from 'zod';

export const WorkTypeParametersSchema = z.object({
  description: z.string().optional(),
  isRequired: z.boolean(),
  workTypeId: z.number(),
});

export type WorkTypeParameters = z.infer<typeof WorkTypeParametersSchema>;
