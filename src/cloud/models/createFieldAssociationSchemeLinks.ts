import { z } from 'zod';
import { apiObject } from '#/core';

export const CreateFieldAssociationSchemeLinksSchema = apiObject({
  associations: z.string().optional(),
  projects: z.string().optional(),
});

export type CreateFieldAssociationSchemeLinks = z.infer<typeof CreateFieldAssociationSchemeLinksSchema>;
