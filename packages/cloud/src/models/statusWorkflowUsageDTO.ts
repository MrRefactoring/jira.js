import { z } from 'zod';
import { StatusWorkflowUsagePageSchema } from '#/models/statusWorkflowUsagePage';

/** Workflows using the status. */
export const StatusWorkflowUsageDTOSchema = z.object({
  /** The status ID. */
  statusId: z.string().optional(),
  workflows: StatusWorkflowUsagePageSchema.optional(),
});

export type StatusWorkflowUsageDTO = z.infer<typeof StatusWorkflowUsageDTOSchema>;
