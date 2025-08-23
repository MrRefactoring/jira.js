import { z } from 'zod';

export const WorklogIdsRequestBeanSchema = z.object({
  /** A list of worklog IDs. */
  ids: z.array(z.number().int()),
});

export type WorklogIdsRequestBean = z.infer<typeof WorklogIdsRequestBeanSchema>;
