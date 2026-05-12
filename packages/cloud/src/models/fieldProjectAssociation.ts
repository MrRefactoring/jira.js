import { z } from 'zod';

/** List of project associations. */
export const FieldProjectAssociationSchema = z.object({
  projectId: z.string().optional(),
});

export type FieldProjectAssociation = z.infer<typeof FieldProjectAssociationSchema>;
