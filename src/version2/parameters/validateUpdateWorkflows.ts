import type { ValidationOptionsForUpdate, WorkflowUpdateRequest } from '../models';

export interface ValidateUpdateWorkflows {
  payload: WorkflowUpdateRequest;
  validationOptions?: ValidationOptionsForUpdate;
}
