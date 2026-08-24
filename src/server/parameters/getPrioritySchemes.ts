import { z } from 'zod';

export const GetPrioritySchemesSchema = z.object({
  /** How many results on the page should be included. Defaults to 100, maximum is 1000. */
  maxResults: z.number().optional(),
  /** The page offset, if not specified then defaults to 0 */
  startAt: z.number().optional(),
});

export type GetPrioritySchemes = z.input<typeof GetPrioritySchemesSchema>;
