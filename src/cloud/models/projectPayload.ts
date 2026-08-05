import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';
/** The payload for creating a project */

export const ProjectPayloadSchema = apiObject({
  fieldLayoutSchemeId: ProjectCreateResourceIdentifierSchema.optional(),
  issueSecuritySchemeId: ProjectCreateResourceIdentifierSchema.optional(),
  issueTypeSchemeId: ProjectCreateResourceIdentifierSchema.optional(),
  issueTypeScreenSchemeId: ProjectCreateResourceIdentifierSchema.optional(),
  notificationSchemeId: ProjectCreateResourceIdentifierSchema.optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
  permissionSchemeId: ProjectCreateResourceIdentifierSchema.optional(),
  /**
   * The [project
   * type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes), which
   * defines the application-specific feature set. If you don't specify the project template you have to specify the
   * project type.
   */
  projectTypeKey: openEnum([
    'software',
    'business',
    'service_desk',
    'product_discovery',
    'customer_service',
  ]).optional(),
  workflowSchemeId: ProjectCreateResourceIdentifierSchema.optional(),
});

export type ProjectPayload = z.infer<typeof ProjectPayloadSchema>;
