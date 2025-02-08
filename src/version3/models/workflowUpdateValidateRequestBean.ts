import { WorkflowUpdateRequest } from './workflowUpdateRequest';
import { ValidationOptionsForUpdate } from './validationOptionsForUpdate';

export interface WorkflowUpdateValidateRequestBean {
  payload: WorkflowUpdateRequest;
  validationOptions?: ValidationOptionsForUpdate;
}
