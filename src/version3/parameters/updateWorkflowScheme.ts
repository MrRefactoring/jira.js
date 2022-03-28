import { WorkflowScheme } from '../models';

export interface UpdateWorkflowScheme extends WorkflowScheme {
  /**
   * The ID of the workflow scheme. Find this ID by editing the desired workflow scheme in Jira. The ID is shown in the
   * URL as `schemeId`. For example, _schemeId=10301_.
   */
  id: number;
}
