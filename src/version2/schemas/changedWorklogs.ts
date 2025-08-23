import { z } from 'zod';
import { ChangedWorklogSchema } from './changedWorklog';

/** List of changed worklogs. */
export const ChangedWorklogsSchema = z.object({
  lastPage: z.boolean().optional(),
  /** The URL of the next list of changed worklogs. */
  nextPage: z.string().optional(),
  /** The URL of this changed worklogs list. */
  self: z.string().optional(),
  /** The datetime of the first worklog item in the list. */
  since: z.number().int().optional(),
  /** The datetime of the last worklog item in the list. */
  until: z.number().int().optional(),
  /** Changed worklog list. */
  values: z.array(ChangedWorklogSchema).optional(),
});

export type ChangedWorklogs = z.infer<typeof ChangedWorklogsSchema>;
