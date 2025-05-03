import type { ProjectCreateResourceIdentifier } from './projectCreateResourceIdentifier';

/** The payload for creating a project */
export interface ProjectPayload {
  fieldLayoutSchemeId?: ProjectCreateResourceIdentifier;
  issueSecuritySchemeId?: ProjectCreateResourceIdentifier;
  issueTypeSchemeId?: ProjectCreateResourceIdentifier;
  issueTypeScreenSchemeId?: ProjectCreateResourceIdentifier;
  notificationSchemeId?: ProjectCreateResourceIdentifier;
  pcri?: ProjectCreateResourceIdentifier;
  permissionSchemeId?: ProjectCreateResourceIdentifier;
  /**
   * The [project
   * type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes), which
   * defines the application-specific feature set. If you don't specify the project template you have to specify the
   * project type.
   */
  projectTypeKey?: 'software' | 'business' | 'service_desk' | 'product_discovery' | string;
  workflowSchemeId?: ProjectCreateResourceIdentifier;
}
