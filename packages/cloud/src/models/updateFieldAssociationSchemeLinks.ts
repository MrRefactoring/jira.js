import { z } from 'zod';

export const UpdateFieldAssociationSchemeLinksSchema = z.object({
  associations: z.string().optional(),
  projects: z.string().optional(),
});

export type UpdateFieldAssociationSchemeLinks = z.infer<typeof UpdateFieldAssociationSchemeLinksSchema>;
