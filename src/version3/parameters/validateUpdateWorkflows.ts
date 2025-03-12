import type { WorkflowUpdateRequest, ValidationOptionsForUpdate } from '../models';

export interface ValidateUpdateWorkflows {
  payload: WorkflowUpdateRequest;
  validationOptions?: ValidationOptionsForUpdate;
}
