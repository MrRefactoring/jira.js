import { z } from 'zod';

export const GetComponentRelatedIssuesSchema = z.object({
  /** A String containing the component id */
  id: z.string(),
});

export type GetComponentRelatedIssues = z.input<typeof GetComponentRelatedIssuesSchema>;
