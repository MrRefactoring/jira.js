import { DefaultWorkflow } from '../models';

export interface UpdateDefaultWorkflow extends DefaultWorkflow {
  /** The ID of the workflow scheme. */
  id: number;
}
