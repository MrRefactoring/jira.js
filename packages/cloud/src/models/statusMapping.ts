import { z } from 'zod';

/** Details about the mapping from a status to a new status for an issue type. */
export const StatusMappingSchema = z.object({
  /** The ID of the issue type. */
  issueTypeId: z.string(),
  /** The ID of the new status. */
  newStatusId: z.string(),
  /** The ID of the status. */
  statusId: z.string(),
});

export type StatusMapping = z.infer<typeof StatusMappingSchema>;
