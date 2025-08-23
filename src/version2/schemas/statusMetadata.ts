import { z } from 'zod';

/** The details of the statuses in the associated workflows. */
export const StatusMetadataSchema = z.object({
  /** The category of the status. */
  category: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
  /** The ID of the status. */
  id: z.string().optional(),
  /** The name of the status. */
  name: z.string().optional(),
});

export type StatusMetadata = z.infer<typeof StatusMetadataSchema>;
