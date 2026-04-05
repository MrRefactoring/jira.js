import { z } from 'zod';

export const GetAvailableTransitionsSchema = z.object({
  /** Comma (,) separated Ids or keys of the issues to get transitions available for them. */
  issueIdsOrKeys: z.string(),
  /** (Optional)The end cursor for use in pagination. */
  endingBefore: z.string().optional(),
  /** (Optional)The start cursor for use in pagination. */
  startingAfter: z.string().optional(),
});

export type GetAvailableTransitions = z.input<typeof GetAvailableTransitionsSchema>;
