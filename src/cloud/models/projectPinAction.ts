import { z } from 'zod';
import { apiObject } from '#/core';
/** The list of projects to pin or unpin the issue panel to or from. */

export const ProjectPinActionSchema = apiObject({
  /** The action to perform: PIN or UNPIN. */
  action: z.enum(['PIN', 'UNPIN']),
  /** The project ID or key. */
  projectIdOrKey: z.string(),
});

export type ProjectPinAction = z.infer<typeof ProjectPinActionSchema>;
