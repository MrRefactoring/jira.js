import type { ValidationOptionsForCreate, WorkflowCreateRequest } from '../models';

export interface ValidateCreateWorkflows {
  payload: WorkflowCreateRequest;
  validationOptions?: ValidationOptionsForCreate;
}
