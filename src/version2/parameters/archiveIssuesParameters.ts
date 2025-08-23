import { z } from 'zod';

export const ArchiveIssuesParametersSchema = z.object({
  issueIdsOrKeys: z.array(z.string()).optional(),
});

export type ArchiveIssuesParameters = z.infer<typeof ArchiveIssuesParametersSchema>;
