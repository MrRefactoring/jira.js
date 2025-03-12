import type { WorkflowCreateRequest, ValidationOptionsForCreate } from '../models';

export interface ValidateCreateWorkflows {
  payload: WorkflowCreateRequest;
  validationOptions?: ValidationOptionsForCreate;
}
