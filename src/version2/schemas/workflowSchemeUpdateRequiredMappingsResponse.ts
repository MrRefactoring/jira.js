import { z } from 'zod';
import { RequiredMappingByIssueTypeSchema } from './requiredMappingByIssueType';
import { RequiredMappingByWorkflowsSchema } from './requiredMappingByWorkflows';
import { StatusMetadataSchema } from './statusMetadata';
import { StatusesPerWorkflowSchema } from './statusesPerWorkflow';

export const WorkflowSchemeUpdateRequiredMappingsResponseSchema = z.object({
  /** The list of required status mappings by issue type. */
  statusMappingsByIssueTypes: z.array(RequiredMappingByIssueTypeSchema).optional(),
  /** The list of required status mappings by workflow. */
  statusMappingsByWorkflows: z.array(RequiredMappingByWorkflowsSchema).optional(),
  /** The details of the statuses in the associated workflows. */
  statuses: z.array(StatusMetadataSchema).optional(),
  /** The statuses associated with each workflow. */
  statusesPerWorkflow: z.array(StatusesPerWorkflowSchema).optional(),
});

export type WorkflowSchemeUpdateRequiredMappingsResponse = z.infer<
  typeof WorkflowSchemeUpdateRequiredMappingsResponseSchema
>;
