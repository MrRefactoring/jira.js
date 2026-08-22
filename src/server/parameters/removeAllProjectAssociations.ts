import { z } from 'zod';

export const RemoveAllProjectAssociationsSchema = z.object({
  /** The id of the issue type scheme whose project associations we're removing */
  schemeId: z.string(),
});

export type RemoveAllProjectAssociations = z.input<typeof RemoveAllProjectAssociationsSchema>;
