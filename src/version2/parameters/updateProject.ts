import type { UpdateProjectDetails } from '../models';

export interface UpdateProject extends UpdateProjectDetails {
  /** The project ID or project key (case-sensitive). */
  projectIdOrKey: string | number;
  /**
   * The [project
   * type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes), which
   * defines the application-specific feature set. If you don't specify the project template you have to specify the
   * project type.
   */
  projectTypeKey?: 'business' | 'service_desk' | 'software' | string;
  /**
   * A predefined configuration for a project. The type of the `projectTemplateKey` must match with the type of the
   * `projectTypeKey`.
   */
  projectTemplateKey?:
    | 'com.atlassian.jira-core-project-templates:jira-core-simplified-content-management'
    | 'com.atlassian.jira-core-project-templates:jira-core-simplified-document-approval'
    | 'com.atlassian.jira-core-project-templates:jira-core-simplified-lead-tracking'
    | 'com.atlassian.jira-core-project-templates:jira-core-simplified-process-control'
    | 'com.atlassian.jira-core-project-templates:jira-core-simplified-procurement'
    | 'com.atlassian.jira-core-project-templates:jira-core-simplified-project-management'
    | 'com.atlassian.jira-core-project-templates:jira-core-simplified-recruitment'
    | 'com.atlassian.jira-core-project-templates:jira-core-simplified-task-tracking'
    | 'com.atlassian.servicedesk:simplified-it-service-management'
    | 'com.atlassian.servicedesk:simplified-general-service-desk'
    | 'com.atlassian.servicedesk:simplified-internal-service-desk'
    | 'com.atlassian.servicedesk:simplified-external-service-desk'
    | 'com.atlassian.servicedesk:simplified-hr-service-desk'
    | 'com.atlassian.servicedesk:simplified-facilities-service-desk'
    | 'com.atlassian.servicedesk:simplified-legal-service-desk'
    | 'com.pyxis.greenhopper.jira:gh-simplified-agility-kanban'
    | 'com.pyxis.greenhopper.jira:gh-simplified-agility-scrum'
    | 'com.pyxis.greenhopper.jira:gh-simplified-basic'
    | 'com.pyxis.greenhopper.jira:gh-simplified-kanban-classic'
    | 'com.pyxis.greenhopper.jira:gh-simplified-scrum-classic'
    | string;
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information in the response. This parameter accepts a comma-separated list. Note that the project description,
   * issue types, and project lead are included in all responses by default. Expand options include:
   *
   * - `description` The project description.
   * - `issueTypes` The issue types associated with the project.
   * - `lead` The project lead.
   * - `projectKeys` All project keys associated with the project.
   */
  expand?:
    | 'description'
    | 'issueTypes'
    | 'lead'
    | 'projectKeys'
    | ('description' | 'issueTypes' | 'lead' | 'projectKeys')[]
    | string
    | string[];
}
