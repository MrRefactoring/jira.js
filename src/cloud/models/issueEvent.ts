import { z } from 'zod';
import { apiObject } from '#/core';
/** Details about an issue event. */

export const IssueEventSchema = apiObject({
  /** The ID of the event. */
  id: z.number().optional(),
  /** The name of the event. */
  name: z.string().optional(),
});

export type IssueEvent = z.infer<typeof IssueEventSchema>;
