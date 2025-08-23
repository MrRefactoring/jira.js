import { z } from 'zod';
import { WorkflowStatusLayoutPayloadSchema } from './workflowStatusLayoutPayload';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';
import { WorkflowStatusPayloadSchema } from './workflowStatusPayload';
import { TransitionPayloadSchema } from './transitionPayload';

/**
 * The payload for creating workflow, see
 * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/#api-rest-api-3-workflows-create-post
 */
export const WorkflowPayloadSchema = z.object({
  /** The description of the workflow */
  description: z.string().optional(),
  loopedTransitionContainerLayout: WorkflowStatusLayoutPayloadSchema.optional(),
  /** The name of the workflow */
  name: z.string().optional(),
  /** The strategy to use if there is a conflict with another workflow */
  onConflict: z.enum(['FAIL', 'USE', 'NEW']).optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
  startPointLayout: WorkflowStatusLayoutPayloadSchema.optional(),
  /** The statuses to be used in the workflow */
  statuses: z.array(WorkflowStatusPayloadSchema).optional(),
  /** The transitions for the workflow */
  transitions: z.array(TransitionPayloadSchema).optional(),
});

export type WorkflowPayload = z.infer<typeof WorkflowPayloadSchema>;
