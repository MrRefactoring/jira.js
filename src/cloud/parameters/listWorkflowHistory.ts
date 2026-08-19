import { z } from 'zod';
import { openEnum } from '#/core';
import { WorkflowHistoryListRequestSchema } from '../models';

export const ListWorkflowHistorySchema = z.object(WorkflowHistoryListRequestSchema.shape).extend({
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
      openEnum(['includeIntermediateWorkflows']),
      z.array(openEnum(['includeIntermediateWorkflows'])),
    ])
    .optional(),
});

export type ListWorkflowHistory = z.input<typeof ListWorkflowHistorySchema>;
