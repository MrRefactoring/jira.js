import { z } from 'zod';
import { apiObject } from '#/core';
import { CreateFieldAssociationSchemeLinksSchema } from './createFieldAssociationSchemeLinks';
/** Response object after successfully creating a new field association scheme. */

export const CreateFieldAssociationSchemeResponseSchema = apiObject({
  description: z.string().optional(),
  id: z.number().optional(),
  links: CreateFieldAssociationSchemeLinksSchema.optional(),
  name: z.string().optional(),
});

export type CreateFieldAssociationSchemeResponse = z.infer<typeof CreateFieldAssociationSchemeResponseSchema>;
