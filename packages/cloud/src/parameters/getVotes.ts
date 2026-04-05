import { z } from 'zod';

export const GetVotesSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
});

export type GetVotes = z.input<typeof GetVotesSchema>;
