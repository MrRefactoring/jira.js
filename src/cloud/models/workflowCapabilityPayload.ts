import { z } from 'zod';
import { apiObject } from '#/core';
import { StatusPayloadSchema } from './statusPayload';
import { WorkflowSchemePayloadSchema } from './workflowSchemePayload';
import { WorkflowPayloadSchema } from './workflowPayload';
/**
 * The payload for creating a workflows. See
 * https://www.atlassian.com/software/jira/guides/workflows/overview#what-is-a-jira-workflow
 */

export const WorkflowCapabilityPayloadSchema = apiObject({
  /** The statuses for the workflow */
  statuses: z.array(StatusPayloadSchema).optional(),
  workflowScheme: WorkflowSchemePayloadSchema.optional(),
  /** The transitions for the workflow */
  workflows: z.array(WorkflowPayloadSchema).optional(),
});

export type WorkflowCapabilityPayload = z.infer<typeof WorkflowCapabilityPayloadSchema>;
