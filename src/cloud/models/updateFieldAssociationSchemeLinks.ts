import { z } from 'zod';
import { apiObject } from '#/core';

export const UpdateFieldAssociationSchemeLinksSchema = apiObject({
  associations: z.string().optional(),
  projects: z.string().optional(),
});

export type UpdateFieldAssociationSchemeLinks = z.infer<typeof UpdateFieldAssociationSchemeLinksSchema>;
