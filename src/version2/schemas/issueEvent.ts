import { z } from 'zod';

/** Details about an issue event. */
export const IssueEventSchema = z.object({
  /** The ID of the event. */
  id: z.number().int().optional(),
  /** The name of the event. */
  name: z.string().optional(),
});

export type IssueEvent = z.infer<typeof IssueEventSchema>;
