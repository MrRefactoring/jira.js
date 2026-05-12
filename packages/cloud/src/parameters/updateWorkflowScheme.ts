import { z } from 'zod';
import { WorkflowSchemeSchema } from '../models';

export const UpdateWorkflowSchemeSchema = z
  .object({
    /**
     * The ID of the workflow scheme. Find this ID by editing the desired workflow scheme in Jira. The ID is shown in
     * the URL as `schemeId`. For example, _schemeId=10301_.
     */
    id: z.number(),
  })
  .extend(WorkflowSchemeSchema.shape);

export type UpdateWorkflowScheme = z.input<typeof UpdateWorkflowSchemeSchema>;
