import { z } from 'zod';
import { apiObject } from '#/core';
import { StatusWorkflowUsagePageSchema } from './statusWorkflowUsagePage';
/** Workflows using the status. */

export const StatusWorkflowUsageDTOSchema = apiObject({
  /** The status ID. */
  statusId: z.string().optional(),
  workflows: StatusWorkflowUsagePageSchema.optional(),
});

export type StatusWorkflowUsageDTO = z.infer<typeof StatusWorkflowUsageDTOSchema>;
