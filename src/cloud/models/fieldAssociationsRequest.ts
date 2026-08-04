import { z } from 'zod';
import { apiObject } from '#/core';
import { AssociationContextObjectSchema } from './associationContextObject';
import { FieldIdentifierObjectSchema } from './fieldIdentifierObject';
/** Details of field associations with projects. */

export const FieldAssociationsRequestSchema = apiObject({
  /** Contexts to associate/unassociate the fields with. */
  associationContexts: z.array(AssociationContextObjectSchema),
  /** Fields to associate/unassociate with projects. */
  fields: z.array(FieldIdentifierObjectSchema),
});

export type FieldAssociationsRequest = z.infer<typeof FieldAssociationsRequestSchema>;
