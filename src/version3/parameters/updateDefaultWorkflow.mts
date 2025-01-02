import { DefaultWorkflow } from '../models/index.mjs';

export interface UpdateDefaultWorkflow extends DefaultWorkflow {
  /** The ID of the workflow scheme. */
  id: number;
}
