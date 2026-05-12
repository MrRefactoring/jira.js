import { z } from 'zod';
import { ChangedWorklogSchema } from '#/models/changedWorklog';

/** List of changed worklogs. */
export const ChangedWorklogsSchema = z.object({
  lastPage: z.boolean().optional(),
  /** The URL of the next list of changed worklogs. */
  nextPage: z.url().optional(),
  /** The URL of this changed worklogs list. */
  self: z.url().optional(),
  /** The datetime of the first worklog item in the list. */
  since: z.number().optional(),
  /** The datetime of the last worklog item in the list. */
  until: z.number().optional(),
  /** Changed worklog list. */
  values: z.array(ChangedWorklogSchema).optional(),
});

export type ChangedWorklogs = z.infer<typeof ChangedWorklogsSchema>;
