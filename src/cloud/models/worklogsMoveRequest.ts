import { z } from 'zod';
import { apiObject } from '#/core';

export const WorklogsMoveRequestSchema = apiObject({
  /** A list of worklog IDs. */
  ids: z.array(z.number()).optional(),
  /** The issue id or key of the destination issue */
  issueIdOrKey: z.string().optional(),
});

export type WorklogsMoveRequest = z.infer<typeof WorklogsMoveRequestSchema>;
