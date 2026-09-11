import { z } from 'zod';

export const RemoveProjectAssociationSchema = z.object({
  /** The id or key of the project that is to be un-associated with the issue type scheme */
  projIdOrKey: z.string(),
  /** The id of the issue type scheme whose project association we're removing */
  schemeId: z.string(),
});

export type RemoveProjectAssociation = z.input<typeof RemoveProjectAssociationSchema>;
