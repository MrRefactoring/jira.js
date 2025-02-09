import { RequiredMappingByIssueType } from './requiredMappingByIssueType';
import { RequiredMappingByWorkflows } from './requiredMappingByWorkflows';
import { StatusMetadata } from './statusMetadata';
import { StatusesPerWorkflow } from './statusesPerWorkflow';

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
