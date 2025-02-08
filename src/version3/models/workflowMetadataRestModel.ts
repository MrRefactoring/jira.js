import { SimpleUsage } from './simpleUsage';
import { DocumentVersion } from './documentVersion';

/** Workflow metadata and usage detail. */
export interface WorkflowMetadataRestModel {
  /** The description of the workflow. */
  description: string;
  /** The ID of the workflow. */
  id: string;
  /** The name of the workflow. */
  name: string;
  /**
   * Use the optional `workflows.usages` expand to get additional information about the projects and issue types
   * associated with the workflows in the workflow scheme.
   */
  usage: SimpleUsage[];
  version: DocumentVersion;
}
