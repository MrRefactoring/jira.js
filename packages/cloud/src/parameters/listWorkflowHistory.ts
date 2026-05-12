import { z } from 'zod';
import { WorkflowHistoryListRequestSchema } from '../models';

export const ListWorkflowHistorySchema = z
  .object({
    /**
     * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#expansion) to include additional
     * information in the response. This parameter accepts a comma-separated list. Expand options include:
     *
     * - `includeIntermediateWorkflows` Includes intermediate workflow versions that are sometimes created during workflow
     *   updates or migrations. By default, these are omitted from the response.
     */
    expand: z
      .union([
        z.string(),
        z.array(z.string()),
        z.enum(['includeIntermediateWorkflows']),
        z.array(z.enum(['includeIntermediateWorkflows'])),
      ])
      .optional(),
  })
  .extend(WorkflowHistoryListRequestSchema.shape);

export type ListWorkflowHistory = z.input<typeof ListWorkflowHistorySchema>;
