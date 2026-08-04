import { z } from 'zod';
import { apiObject } from '#/core';

export const FieldAssociationSchemeLinksBeanSchema = apiObject({
  associations: z.string().optional(),
  projects: z.string().optional(),
});

export type FieldAssociationSchemeLinksBean = z.infer<typeof FieldAssociationSchemeLinksBeanSchema>;
