import { z } from 'zod';
import { apiObject } from '#/core';
/** Request object for creating a new field association scheme. */

export const CreateFieldAssociationSchemeRequestSchema = apiObject({
  /** Description of the scheme to be created */
  description: z.string().optional(),
  /** The name of the scheme to be created */
  name: z.string(),
});

export type CreateFieldAssociationSchemeRequest = z.infer<typeof CreateFieldAssociationSchemeRequestSchema>;
