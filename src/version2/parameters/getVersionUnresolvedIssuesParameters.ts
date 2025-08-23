import { z } from 'zod';

export const GetVersionUnresolvedIssuesParametersSchema = z.object({
  /** The ID of the version. */
  id: z.string(),
});

export type GetVersionUnresolvedIssuesParameters = z.infer<typeof GetVersionUnresolvedIssuesParametersSchema>;
