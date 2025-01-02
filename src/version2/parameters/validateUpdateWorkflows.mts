import { ValidationOptionsForUpdate, WorkflowUpdateRequest } from '../models/index.mjs';

export interface ValidateUpdateWorkflows {
  payload: WorkflowUpdateRequest;
  validationOptions?: ValidationOptionsForUpdate;
}
