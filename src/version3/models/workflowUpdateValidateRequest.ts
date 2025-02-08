import { WorkflowUpdateRequest } from './workflowUpdateRequest';
import { ValidationOptionsForUpdate } from './validationOptionsForUpdate';

export interface WorkflowUpdateValidateRequest {
  payload: WorkflowUpdateRequest;
  validationOptions?: ValidationOptionsForUpdate;
}
