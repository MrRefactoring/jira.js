import { z } from 'zod';
import { ProjectCreateResourceIdentifierSchema } from '#/models/projectCreateResourceIdentifier';

/** Defines the payload for the field association scheme. */
export const FieldAssociationItemPayloadSchema = z.object({
  /** The description of the field association item */
  description: z.string().optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
  qualifierId: ProjectCreateResourceIdentifierSchema.optional(),
  qualifierType: ProjectCreateResourceIdentifierSchema.optional(),
  /** The renderer type of the field */
  rendererType: z.string().optional(),
  /** Whether the field is required */
  required: z.boolean().optional(),
});

export type FieldAssociationItemPayload = z.infer<typeof FieldAssociationItemPayloadSchema>;
