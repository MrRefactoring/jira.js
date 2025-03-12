import type { SimpleUsage } from './simpleUsage';
import type { DocumentVersion } from './documentVersion';

/** Workflow metadata and usage detail. */
export interface WorkflowMetadataRestModel {
  /** The description of the workflow. */
  description: string;
  /** The ID of the workflow. */
  id: string;
  /** The name of the workflow. */
  name: string;
  /**
   * @deprecated See the [deprecation
   *   notice](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2298) for details.
   *
   *   Use the optional `workflows.usages` expand to get additional information about the projects and issue types
   *   associated with the workflows in the workflow scheme.
   */
  usage?: SimpleUsage[];
  version: DocumentVersion;
}
