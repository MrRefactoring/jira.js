import { z } from 'zod';
import { apiObject } from '#/core';

export const FieldAssociationSchemeLinksSchema = apiObject({
  associations: z.string().optional(),
  projects: z.string().optional(),
});

export type FieldAssociationSchemeLinks = z.infer<typeof FieldAssociationSchemeLinksSchema>;
