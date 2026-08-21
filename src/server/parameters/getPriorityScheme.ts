import { z } from 'zod';

export const GetPrioritySchemeSchema = z.object({
  /** Id of priority scheme to get */
  schemeId: z.number(),
});

export type GetPriorityScheme = z.input<typeof GetPrioritySchemeSchema>;
