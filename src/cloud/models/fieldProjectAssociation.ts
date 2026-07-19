import { z } from 'zod';
import { apiObject } from '#/core';
/** List of project associations. */

export const FieldProjectAssociationSchema = apiObject({
  projectId: z.string().optional(),
});

export type FieldProjectAssociation = z.infer<typeof FieldProjectAssociationSchema>;
