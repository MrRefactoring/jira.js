import { z } from 'zod';
import { apiObject } from '#/core';
import { FieldAssociationParametersSchema } from './fieldAssociationParameters';
import { WorkTypeParametersSchema } from './workTypeParameters';
/** Response object for getting field association parameters. */

export const GetFieldAssociationParametersResponseSchema = apiObject({
  fieldId: z.string(),
  parameters: FieldAssociationParametersSchema.optional(),
  workTypeParameters: z.array(WorkTypeParametersSchema).optional(),
});

export type GetFieldAssociationParametersResponse = z.infer<typeof GetFieldAssociationParametersResponseSchema>;
