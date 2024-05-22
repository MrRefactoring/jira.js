import type { DefaultWorkflow } from '../models/index.js';

export interface UpdateDefaultWorkflow extends DefaultWorkflow {
  /** The ID of the workflow scheme. */
  id: number;
}
