import type { WorkflowUpdateRequest } from './workflowUpdateRequest';
import type { ValidationOptionsForUpdate } from './validationOptionsForUpdate';

export interface WorkflowUpdateValidateRequest {
  payload: WorkflowUpdateRequest;
  validationOptions?: ValidationOptionsForUpdate;
}
