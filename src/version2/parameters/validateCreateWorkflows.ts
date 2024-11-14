import type { ValidationOptionsForCreate, WorkflowCreateRequest } from '../models/index.js';

export interface ValidateCreateWorkflows {
  payload: WorkflowCreateRequest;
  validationOptions?: ValidationOptionsForCreate;
}
