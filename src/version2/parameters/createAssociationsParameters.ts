import { z } from 'zod';
import { AssociationContextObjectSchema } from './associationContextObject';
import { FieldIdentifierObjectSchema } from './fieldIdentifierObject';

export const CreateAssociationsParametersSchema = z.object({
  /** Contexts to associate/unassociate the fields with. */
  associationContexts: z.array(AssociationContextObjectSchema),
  /** Fields to associate/unassociate with projects. */
  fields: z.array(FieldIdentifierObjectSchema),
});

export type CreateAssociationsParameters = z.infer<typeof CreateAssociationsParametersSchema>;
