import { z } from 'zod';
import { AssociateProjectsSchema } from '../models';

export const SetProjectAssociationsForSchemeSchema = z.object(AssociateProjectsSchema.shape).extend({
  /** The id of the issue type scheme whose project associations we're replacing. */
  schemeId: z.string(),
});

export type SetProjectAssociationsForScheme = z.input<typeof SetProjectAssociationsForSchemeSchema>;
