import { z } from 'zod';

/** An issue priority with sequence information. */
export const PriorityWithSequenceSchema = z.object({
  /** The description of the issue priority. */
  description: z.string().optional(),
  /** The URL of the icon for the issue priority. */
  iconUrl: z.string().optional(),
  /** The ID of the issue priority. */
  id: z.string().optional(),
  /** Whether this priority is the default. */
  isDefault: z.boolean().optional(),
  /** The name of the issue priority. */
  name: z.string().optional(),
  /** The URL of the issue priority. */
  self: z.string().optional(),
  /** The sequence of the issue priority. */
  sequence: z.string().optional(),
  /** The color used to indicate the issue priority. */
  statusColor: z.string().optional(),
});

export type PriorityWithSequence = z.infer<typeof PriorityWithSequenceSchema>;
