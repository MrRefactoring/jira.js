import { z } from 'zod';
import { apiObject } from '#/core';
import { UpdateFieldAssociationSchemeLinksSchema } from './updateFieldAssociationSchemeLinks';
/** Response object after successfully updating an existing field association scheme. */

export const UpdateFieldAssociationSchemeResponseSchema = apiObject({
  description: z.string().optional(),
  id: z.number().optional(),
  links: UpdateFieldAssociationSchemeLinksSchema.optional(),
  name: z.string().optional(),
});

export type UpdateFieldAssociationSchemeResponse = z.infer<typeof UpdateFieldAssociationSchemeResponseSchema>;
