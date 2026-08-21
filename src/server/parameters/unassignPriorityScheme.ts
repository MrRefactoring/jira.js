import { z } from 'zod';

export const UnassignPrioritySchemeSchema = z.object({
  /** Object that contains an id of the scheme */
  schemeId: z.number(),
  /** Key or id of the project */
  projectKeyOrId: z.string(),
});

export type UnassignPriorityScheme = z.input<typeof UnassignPrioritySchemeSchema>;
