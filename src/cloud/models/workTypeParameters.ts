import { z } from 'zod';
import { apiObject } from '#/core';

export const WorkTypeParametersSchema = apiObject({
  description: z.string().optional(),
  isRequired: z.boolean(),
  rendererType: z.string().optional(),
  workTypeId: z.number(),
});

export type WorkTypeParameters = z.infer<typeof WorkTypeParametersSchema>;
