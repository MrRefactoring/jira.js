import { z } from 'zod';

/** Request object for creating a new field association scheme. */
export const CreateFieldAssociationSchemeRequestSchema = z.object({
  /** Description of the scheme to be created */
  description: z.string().optional(),
  /** The name of the scheme to be created */
  name: z.string(),
});

export type CreateFieldAssociationSchemeRequest = z.infer<typeof CreateFieldAssociationSchemeRequestSchema>;
