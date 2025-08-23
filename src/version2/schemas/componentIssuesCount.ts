import { z } from 'zod';

/** Count of issues assigned to a component. */
export const ComponentIssuesCountSchema = z.object({
  /** The count of issues assigned to a component. */
  issueCount: z.number().int().optional(),
  /** The URL for this count of issues for a component. */
  self: z.string().optional(),
});

export type ComponentIssuesCount = z.infer<typeof ComponentIssuesCountSchema>;
