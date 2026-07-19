import { z } from 'zod';
import { apiObject } from '#/core';

export const FieldAssociationParametersSchema = apiObject({
  description: z.string().optional(),
  isRequired: z.boolean(),
  rendererType: z.string().optional(),
});

export type FieldAssociationParameters = z.infer<typeof FieldAssociationParametersSchema>;
