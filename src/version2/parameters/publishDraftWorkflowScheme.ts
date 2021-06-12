import { StatusMapping } from '../models';

export interface PublishDraftWorkflowScheme {
  /** The ID of the workflow scheme that the draft belongs to. */
  id: number;
  /** Whether the request only performs a validation. */
  validateOnly?: boolean;
  statusMappings?: StatusMapping[];
}
