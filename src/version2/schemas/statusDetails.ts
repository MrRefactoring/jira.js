import { z } from 'zod';

/** A status. */
export const StatusDetailsSchema = z.object({
  /** The description of the status. */
  description: z.string().optional(),
  /** The URL of the icon used to represent the status. */
  iconUrl: z.string().optional(),
  /** The ID of the status. */
  id: z.string().optional(),
  /** The name of the status. */
  name: z.string().optional(),
  /** The scope of the field. */
  scope: z.unknown().optional(),
  /** The URL of the status. */
  self: z.string().optional(),
  /** The category assigned to the status. */
  statusCategory: z.unknown().optional(),
});

export type StatusDetails = z.infer<typeof StatusDetailsSchema>;
