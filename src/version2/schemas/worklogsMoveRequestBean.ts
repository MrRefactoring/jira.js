import { z } from 'zod';

export const WorklogsMoveRequestBeanSchema = z.object({
  /** A list of worklog IDs. */
  ids: z.array(z.number().int()).optional(),
  /** The issue id or key of the destination issue */
  issueIdOrKey: z.string().optional(),
});

export type WorklogsMoveRequestBean = z.infer<typeof WorklogsMoveRequestBeanSchema>;
