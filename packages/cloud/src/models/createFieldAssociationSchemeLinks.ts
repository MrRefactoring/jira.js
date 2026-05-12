import { z } from 'zod';

export const CreateFieldAssociationSchemeLinksSchema = z.object({
  associations: z.string().optional(),
  projects: z.string().optional(),
});

export type CreateFieldAssociationSchemeLinks = z.infer<typeof CreateFieldAssociationSchemeLinksSchema>;
