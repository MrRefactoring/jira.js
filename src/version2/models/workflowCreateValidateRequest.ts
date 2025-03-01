import { WorkflowCreateRequest } from './workflowCreateRequest';
import { ValidationOptionsForCreate } from './validationOptionsForCreate';

export interface WorkflowCreateValidateRequest {
  payload: WorkflowCreateRequest;
  validationOptions?: ValidationOptionsForCreate;
}
