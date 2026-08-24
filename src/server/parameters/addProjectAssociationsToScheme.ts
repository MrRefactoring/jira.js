import { z } from 'zod';
import { AssociateProjectsSchema } from '../models';

export const AddProjectAssociationsToSchemeSchema = z.object(AssociateProjectsSchema.shape).extend({
  /** The id of the issue type scheme whose project associations we're adding to. */
  schemeId: z.string(),
});

export type AddProjectAssociationsToScheme = z.input<typeof AddProjectAssociationsToSchemeSchema>;
