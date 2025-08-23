import { z } from 'zod';

export const MatchIssuesParametersSchema = z.object({
  /** A list of issue IDs. */
  issueIds: z.array(z.number().int()),
  /** A list of JQL queries. */
  jqls: z.array(z.string()),
});

export type MatchIssuesParameters = z.infer<typeof MatchIssuesParametersSchema>;
