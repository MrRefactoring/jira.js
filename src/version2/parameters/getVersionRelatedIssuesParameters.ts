import { z } from 'zod';

export const GetVersionRelatedIssuesParametersSchema = z.object({
  /** The ID of the version. */
  id: z.string(),
});

export type GetVersionRelatedIssuesParameters = z.infer<typeof GetVersionRelatedIssuesParametersSchema>;
