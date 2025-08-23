import { z } from 'zod';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';

/** The payload for creating a project */
export const ProjectPayloadSchema = z.object({
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
  projectTypeKey: z.enum(['software', 'business', 'service_desk', 'product_discovery']).optional(),
  workflowSchemeId: ProjectCreateResourceIdentifierSchema.optional(),
});

export type ProjectPayload = z.infer<typeof ProjectPayloadSchema>;
