import { z } from 'zod';
import { FieldAssociationParametersSchema } from '#/models/fieldAssociationParameters';
import { WorkTypeParametersSchema } from '#/models/workTypeParameters';

/** Response object for getting field association parameters. */
export const GetFieldAssociationParametersResponseSchema = z.object({
  fieldId: z.string(),
  parameters: FieldAssociationParametersSchema.optional(),
  workTypeParameters: z.array(WorkTypeParametersSchema).optional(),
});

export type GetFieldAssociationParametersResponse = z.infer<typeof GetFieldAssociationParametersResponseSchema>;
