import { z } from 'zod';
import { StatusProjectUsagePageSchema } from './statusProjectUsagePage';

/** The projects using this status. */
export const StatusProjectUsageDTOSchema = z.object({
  projects: StatusProjectUsagePageSchema.optional(),
  /** The status ID. */
  statusId: z.string().optional(),
});

export type StatusProjectUsageDTO = z.infer<typeof StatusProjectUsageDTOSchema>;
