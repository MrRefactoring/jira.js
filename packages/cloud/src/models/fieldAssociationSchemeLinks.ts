import { z } from 'zod';

export const FieldAssociationSchemeLinksSchema = z.object({
  associations: z.string().optional(),
  projects: z.string().optional(),
});

export type FieldAssociationSchemeLinks = z.infer<typeof FieldAssociationSchemeLinksSchema>;
