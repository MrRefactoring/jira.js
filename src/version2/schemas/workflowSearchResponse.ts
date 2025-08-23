import { z } from 'zod';
import { JiraWorkflowStatusSchema } from './jiraWorkflowStatus';
import { JiraWorkflowSchema } from './jiraWorkflow';

/** Page of items, including workflows and related statuses. */
export const WorkflowSearchResponseSchema = z.object({
  /** Whether this is the last page. */
  isLast: z.boolean().optional(),
  /** The maximum number of items that could be returned. */
  maxResults: z.number().int().optional(),
  /** If there is another page of results, the URL of the next page. */
  nextPage: z.string().optional(),
  /** The URL of the page. */
  self: z.string().optional(),
  /** The index of the first item returned. */
  startAt: z.number().int().optional(),
  /** List of statuses. */
  statuses: z.array(JiraWorkflowStatusSchema).optional(),
  /** The number of items returned. */
  total: z.number().int().optional(),
  /** List of workflows. */
  values: z.array(JiraWorkflowSchema).optional(),
});

export type WorkflowSearchResponse = z.infer<typeof WorkflowSearchResponseSchema>;
