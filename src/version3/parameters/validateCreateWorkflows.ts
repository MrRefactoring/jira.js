import { WorkflowCreateRequest, ValidationOptionsForCreate } from '../models';

export interface ValidateCreateWorkflows {
  payload: WorkflowCreateRequest;
  validationOptions?: ValidationOptionsForCreate;
}
