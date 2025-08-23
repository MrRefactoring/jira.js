import { z } from 'zod';

export const ArchiveIssuesAsyncParametersSchema = z.object({
  jql: z.string().optional(),
});

export type ArchiveIssuesAsyncParameters = z.infer<typeof ArchiveIssuesAsyncParametersSchema>;
