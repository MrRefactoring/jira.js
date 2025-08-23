import { z } from 'zod';

/** Counts of the number of issues in various statuses. */
export const VersionIssuesStatusSchema = z.object({
  /** Count of issues with status _done_. */
  done: z.number().int().optional(),
  /** Count of issues with status _in progress_. */
  inProgress: z.number().int().optional(),
  /** Count of issues with status _to do_. */
  toDo: z.number().int().optional(),
  /** Count of issues with a status other than _to do_, _in progress_, and _done_. */
  unmapped: z.number().int().optional(),
});

export type VersionIssuesStatus = z.infer<typeof VersionIssuesStatusSchema>;
