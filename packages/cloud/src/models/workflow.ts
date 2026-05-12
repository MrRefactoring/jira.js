import { z } from 'zod';
import { PublishedWorkflowIdSchema } from '#/models/publishedWorkflowId';
import { WorkflowOperationsSchema } from '#/models/workflowOperations';
import { ProjectDetailsSchema } from '#/models/projectDetails';
import { WorkflowSchemeIdNameSchema } from '#/models/workflowSchemeIdName';
import { WorkflowStatusSchema } from '#/models/workflowStatus';
import { TransitionSchema } from '#/models/transition';

/** Details about a workflow. */
export const WorkflowSchema = z.object({
  /** The creation date of the workflow. */
  created: z
    .string()
    .transform(s => new Date(s))
    .optional(),
  /** The description of the workflow. */
  description: z.string(),
  /** Whether the workflow has a draft version. */
  hasDraftWorkflow: z.boolean().optional(),
  id: PublishedWorkflowIdSchema,
  /** Whether this is the default workflow. */
  isDefault: z.boolean().optional(),
  operations: WorkflowOperationsSchema.optional(),
  /** The projects the workflow is assigned to, through workflow schemes. */
  projects: z.array(ProjectDetailsSchema).optional(),
  /** The workflow schemes the workflow is assigned to. */
  schemes: z.array(WorkflowSchemeIdNameSchema).optional(),
  /** The statuses of the workflow. */
  statuses: z.array(WorkflowStatusSchema).optional(),
  /** The transitions of the workflow. */
  transitions: z.array(TransitionSchema).optional(),
  /** The last edited date of the workflow. */
  updated: z
    .string()
    .transform(s => new Date(s))
    .optional(),
});

export type Workflow = z.infer<typeof WorkflowSchema>;
