import { ValidationOptionsForCreate, WorkflowCreateRequest } from '../models/index.mjs';

export interface ValidateCreateWorkflows {
  payload: WorkflowCreateRequest;
  validationOptions?: ValidationOptionsForCreate;
}
