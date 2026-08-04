import type { z } from 'zod';
import { apiObject } from '#/core';
import { BoardFeaturesPayloadSchema } from './boardFeaturesPayload';
import { BoardsPayloadSchema } from './boardsPayload';
import { FieldCapabilityPayloadSchema } from './fieldCapabilityPayload';
import { IssueTypeProjectCreatePayloadSchema } from './issueTypeProjectCreatePayload';
import { NotificationSchemePayloadSchema } from './notificationSchemePayload';
import { PermissionPayloadDTOSchema } from './permissionPayloadDTO';
import { ProjectPayloadSchema } from './projectPayload';
import { RolesCapabilityPayloadSchema } from './rolesCapabilityPayload';
import { ScopePayloadSchema } from './scopePayload';
import { SecuritySchemePayloadSchema } from './securitySchemePayload';
import { WorkflowCapabilityPayloadSchema } from './workflowCapabilityPayload';
/** The specific request object for creating a project with template. */

export const CustomTemplateRequestDTOSchema = apiObject({
  boardFeatures: BoardFeaturesPayloadSchema.optional(),
  boards: BoardsPayloadSchema.optional(),
  field: FieldCapabilityPayloadSchema.optional(),
  issueType: IssueTypeProjectCreatePayloadSchema.optional(),
  notification: NotificationSchemePayloadSchema.optional(),
  permissionScheme: PermissionPayloadDTOSchema.optional(),
  project: ProjectPayloadSchema.optional(),
  role: RolesCapabilityPayloadSchema.optional(),
  scope: ScopePayloadSchema.optional(),
  security: SecuritySchemePayloadSchema.optional(),
  workflow: WorkflowCapabilityPayloadSchema.optional(),
});

export type CustomTemplateRequestDTO = z.infer<typeof CustomTemplateRequestDTOSchema>;
