import { z } from 'zod';

export const GetComponentRelatedIssuesSchema = z.object({
  /** The ID of the component. */
  id: z.string(),
});

export type GetComponentRelatedIssues = z.input<typeof GetComponentRelatedIssuesSchema>;
