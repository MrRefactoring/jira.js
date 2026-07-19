import { z } from 'zod';
import { apiObject } from '#/core';
import { FieldAssociationSchemeLinksSchema } from './fieldAssociationSchemeLinks';
/** Response object for getting a field association scheme by ID. */

export const GetFieldAssociationSchemeByIdResponseSchema = apiObject({
  description: z.string().optional(),
  fieldsCount: z.number().optional(),
  id: z.string().optional(),
  isDefault: z.boolean().optional(),
  links: FieldAssociationSchemeLinksSchema.optional(),
  name: z.string().optional(),
});

export type GetFieldAssociationSchemeByIdResponse = z.infer<typeof GetFieldAssociationSchemeByIdResponseSchema>;
