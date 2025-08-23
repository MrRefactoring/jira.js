import { z } from 'zod';

export const UnarchiveIssuesParametersSchema = z.object({
  issueIdsOrKeys: z.array(z.string()).optional(),
});

export type UnarchiveIssuesParameters = z.infer<typeof UnarchiveIssuesParametersSchema>;
