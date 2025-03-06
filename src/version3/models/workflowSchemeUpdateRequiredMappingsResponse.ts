import type { RequiredMappingByIssueType } from './requiredMappingByIssueType';
import type { RequiredMappingByWorkflows } from './requiredMappingByWorkflows';
import type { StatusMetadata } from './statusMetadata';
import type { StatusesPerWorkflow } from './statusesPerWorkflow';

export interface WorkflowSchemeUpdateRequiredMappingsResponse {
  /** The list of required status mappings by issue type. */
  statusMappingsByIssueTypes?: RequiredMappingByIssueType[];
  /** The list of required status mappings by workflow. */
  statusMappingsByWorkflows?: RequiredMappingByWorkflows[];
  /** The details of the statuses in the associated workflows. */
  statuses?: StatusMetadata[];
  /** The statuses associated with each workflow. */
  statusesPerWorkflow?: StatusesPerWorkflow[];
}
