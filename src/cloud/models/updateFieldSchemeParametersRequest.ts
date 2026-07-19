import { z } from 'zod';
import { apiObject } from '#/core';
import { FieldsSchemeItemParameterSchema } from './fieldsSchemeItemParameter';
import { FieldsSchemeItemWorkTypeParameterSchema } from './fieldsSchemeItemWorkTypeParameter';
/** Request bean for updating field scheme parameters across multiple schemes and work types. */

export const UpdateFieldSchemeParametersRequestSchema = apiObject({
  parameters: FieldsSchemeItemParameterSchema.optional(),
  /** The list of field scheme IDs to update */
  schemeIds: z.array(z.number()).optional(),
  /** The list of work type-specific parameter overrides, may be empty if only default parameters are being updated */
  workTypeParameters: z.array(FieldsSchemeItemWorkTypeParameterSchema).optional(),
});

export type UpdateFieldSchemeParametersRequest = z.infer<typeof UpdateFieldSchemeParametersRequestSchema>;
