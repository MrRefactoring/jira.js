import type { ValidationOptionsForUpdate, WorkflowUpdateRequest } from '../models/index.js';

export interface ValidateUpdateWorkflows {
  payload: WorkflowUpdateRequest;
  validationOptions?: ValidationOptionsForUpdate;
}
