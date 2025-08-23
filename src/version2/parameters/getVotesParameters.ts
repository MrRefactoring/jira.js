import { z } from 'zod';

export const GetVotesParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
});

export type GetVotesParameters = z.infer<typeof GetVotesParametersSchema>;
