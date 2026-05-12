import { z } from 'zod';

/** The payload for custom swimlanes */
export const SwimlanePayloadSchema = z.object({
  /** The description of the quick filter */
  description: z.string().optional(),
  /** The jql query for the quick filter */
  jqlQuery: z.string().optional(),
  /** The name of the quick filter */
  name: z.string().optional(),
});

export type SwimlanePayload = z.infer<typeof SwimlanePayloadSchema>;
