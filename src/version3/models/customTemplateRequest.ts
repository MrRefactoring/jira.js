import type { BoardsPayload } from './boardsPayload';
import type { FieldCapabilityPayload } from './fieldCapabilityPayload';
import type { IssueTypeProjectCreatePayload } from './issueTypeProjectCreatePayload';
import type { NotificationSchemePayload } from './notificationSchemePayload';
import type { PermissionPayload } from './permissionPayload';
import type { ProjectPayload } from './projectPayload';
import type { RolesCapabilityPayload } from './rolesCapabilityPayload';
import type { ScopePayload } from './scopePayload';
import type { SecuritySchemePayload } from './securitySchemePayload';
import type { WorkflowCapabilityPayload } from './workflowCapabilityPayload';

/** The specific request object for creating a project with template. */
export interface CustomTemplateRequest {
  boards?: BoardsPayload;
  field?: FieldCapabilityPayload;
  issueType?: IssueTypeProjectCreatePayload;
  notification?: NotificationSchemePayload;
  permissionScheme?: PermissionPayload;
  project?: ProjectPayload;
  role?: RolesCapabilityPayload;
  scope?: ScopePayload;
  security?: SecuritySchemePayload;
  workflow?: WorkflowCapabilityPayload;
}
