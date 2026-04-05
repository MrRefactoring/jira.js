import { z } from 'zod';
import { BoardFeaturesPayloadSchema } from '#/models/boardFeaturesPayload';
import { BoardsPayloadSchema } from '#/models/boardsPayload';
import { FieldCapabilityPayloadSchema } from '#/models/fieldCapabilityPayload';
import { IssueTypeProjectCreatePayloadSchema } from '#/models/issueTypeProjectCreatePayload';
import { NotificationSchemePayloadSchema } from '#/models/notificationSchemePayload';
import { PermissionPayloadDTOSchema } from '#/models/permissionPayloadDTO';
import { ProjectPayloadSchema } from '#/models/projectPayload';
import { RolesCapabilityPayloadSchema } from '#/models/rolesCapabilityPayload';
import { ScopePayloadSchema } from '#/models/scopePayload';
import { SecuritySchemePayloadSchema } from '#/models/securitySchemePayload';
import { WorkflowCapabilityPayloadSchema } from '#/models/workflowCapabilityPayload';

/** The specific request object for creating a project with template. */
export const CustomTemplateRequestDTOSchema = z.object({
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
