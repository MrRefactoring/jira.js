import { z } from 'zod';

export const RemoveIssuesFromEpicSchema = z.object({
  issues: z.array(z.string()),
});

export type RemoveIssuesFromEpic = z.input<typeof RemoveIssuesFromEpicSchema>;
