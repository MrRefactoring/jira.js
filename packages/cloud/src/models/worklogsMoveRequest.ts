import { z } from 'zod';

export const WorklogsMoveRequestSchema = z.object({
  /** A list of worklog IDs. */
  ids: z.array(z.number()).optional(),
  /** The issue id or key of the destination issue */
  issueIdOrKey: z.string().optional(),
});

export type WorklogsMoveRequest = z.infer<typeof WorklogsMoveRequestSchema>;
