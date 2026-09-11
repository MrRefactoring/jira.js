import { z } from 'zod';

export const GetVotesSchema = z.object({
  /** Issue id or key */
  issueIdOrKey: z.string(),
});

export type GetVotes = z.input<typeof GetVotesSchema>;
