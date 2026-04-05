import { z } from 'zod';

export const CreateProjectSchema = z.object({
  /** The default assignee when creating issues for this project. */
  assigneeType: z.enum(['PROJECT_LEAD', 'UNASSIGNED']).optional(),
  /** An integer value for the project's avatar. */
  avatarId: z.number().optional(),
  /**
   * The ID of the project's category. A complete list of category IDs is found using the [Get all project
   * categories](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-category/#api-rest-api-3-projectCategory-get)
   * operation.
   */
  categoryId: z.number().optional(),
  /** A brief description of the project. */
  description: z.string().optional(),
  /**
   * The ID of the field scheme for the project. Use the [Get field
   * schemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-config/#api-rest-api-3-config-fieldschemes-get)
   * operation to get a list of field scheme IDs. If you specify the field scheme you cannot specify the project
   * template key.
   */
  fieldScheme: z.number().optional(),
  /**
   * The ID of the issue security scheme for the project, which enables you to control who can and cannot view issues.
   * Use the [Get issue security
   * schemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-security-schemes/#api-rest-api-3-issuesecurityschemes-get)
   * resource to get all issue security scheme IDs.
   */
  issueSecurityScheme: z.number().optional(),
  /**
   * The ID of the issue type scheme for the project. Use the [Get all issue type
   * schemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-type-schemes/#api-rest-api-3-issuetypescheme-get)
   * operation to get a list of issue type scheme IDs. If you specify the issue type scheme you cannot specify the
   * project template key.
   */
  issueTypeScheme: z.number().optional(),
  /**
   * The ID of the issue type screen scheme for the project. Use the [Get all issue type screen
   * schemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-type-screen-schemes/#api-rest-api-3-issuetypescreenscheme-get)
   * operation to get a list of issue type screen scheme IDs. If you specify the issue type screen scheme you cannot
   * specify the project template key.
   */
  issueTypeScreenScheme: z.number().optional(),
  /**
   * Project keys must be unique and start with an uppercase letter followed by one or more uppercase alphanumeric
   * characters. The maximum length is 10 characters.
   */
  key: z.string(),
  /**
   * The account ID of the project lead. Either `lead` or `leadAccountId` must be set when creating a project. Cannot be
   * provided with `lead`.
   */
  leadAccountId: z.string().max(128, 'leadAccountId must be at most 128 characters'),
  /** The name of the project. */
  name: z.string(),
  /**
   * The ID of the notification scheme for the project. Use the [Get notification
   * schemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-notification-schemes/#api-rest-api-3-notificationscheme-get)
   * resource to get a list of notification scheme IDs.
   */
  notificationScheme: z.number().optional(),
  /**
   * The ID of the permission scheme for the project. Use the [Get all permission
   * schemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-permission-schemes/#api-rest-api-3-permissionscheme-get)
   * resource to see a list of all permission scheme IDs.
   */
  permissionScheme: z.number().optional(),
  /**
   * A predefined configuration for a project. The type of the `projectTemplateKey` must match with the type of the
   * `projectTypeKey`.
   */
  projectTemplateKey: z
    .enum([
      'com.pyxis.greenhopper.jira:gh-simplified-agility-kanban',
      'com.pyxis.greenhopper.jira:gh-simplified-agility-scrum',
      'com.pyxis.greenhopper.jira:gh-simplified-basic',
      'com.pyxis.greenhopper.jira:gh-simplified-kanban-classic',
      'com.pyxis.greenhopper.jira:gh-simplified-scrum-classic',
      'com.pyxis.greenhopper.jira:gh-cross-team-template',
      'com.pyxis.greenhopper.jira:gh-cross-team-planning-template',
      'com.atlassian.servicedesk:simplified-it-service-management',
      'com.atlassian.servicedesk:simplified-it-service-management-basic',
      'com.atlassian.servicedesk:simplified-it-service-management-operations',
      'com.atlassian.servicedesk:simplified-internal-service-desk',
      'com.atlassian.servicedesk:simplified-external-service-desk',
      'com.atlassian.servicedesk:simplified-hr-service-desk',
      'com.atlassian.servicedesk:simplified-facilities-service-desk',
      'com.atlassian.servicedesk:simplified-legal-service-desk',
      'com.atlassian.servicedesk:simplified-marketing-service-desk',
      'com.atlassian.servicedesk:simplified-finance-service-desk',
      'com.atlassian.servicedesk:simplified-analytics-service-desk',
      'com.atlassian.servicedesk:simplified-design-service-desk',
      'com.atlassian.servicedesk:simplified-sales-service-desk',
      'com.atlassian.servicedesk:simplified-halp-service-desk',
      'com.atlassian.servicedesk:next-gen-it-service-desk',
      'com.atlassian.servicedesk:next-gen-hr-service-desk',
      'com.atlassian.servicedesk:next-gen-legal-service-desk',
      'com.atlassian.servicedesk:next-gen-marketing-service-desk',
      'com.atlassian.servicedesk:next-gen-facilities-service-desk',
      'com.atlassian.servicedesk:next-gen-general-service-desk',
      'com.atlassian.servicedesk:next-gen-analytics-service-desk',
      'com.atlassian.servicedesk:next-gen-finance-service-desk',
      'com.atlassian.servicedesk:next-gen-design-service-desk',
      'com.atlassian.servicedesk:next-gen-sales-service-desk',
      'com.atlassian.jira-core-project-templates:jira-core-simplified-content-management',
      'com.atlassian.jira-core-project-templates:jira-core-simplified-document-approval',
      'com.atlassian.jira-core-project-templates:jira-core-simplified-lead-tracking',
      'com.atlassian.jira-core-project-templates:jira-core-simplified-process-control',
      'com.atlassian.jira-core-project-templates:jira-core-simplified-procurement',
      'com.atlassian.jira-core-project-templates:jira-core-simplified-project-management',
      'com.atlassian.jira-core-project-templates:jira-core-simplified-recruitment',
      'com.atlassian.jira-core-project-templates:jira-core-simplified-task-',
      'com.atlassian.jcs:customer-service-management',
    ])
    .optional(),
  /**
   * The [project
   * type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes), which
   * defines the application-specific feature set. If you don't specify the project template you have to specify the
   * project type.
   */
  projectTypeKey: z.enum(['software', 'service_desk', 'business']).optional(),
  /** A link to information about this project, such as project documentation */
  url: z.string().optional(),
  /**
   * The ID of the workflow scheme for the project. Use the [Get all workflow
   * schemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-schemes/#api-rest-api-3-workflowscheme-get)
   * operation to get a list of workflow scheme IDs. If you specify the workflow scheme you cannot specify the project
   * template key.
   */
  workflowScheme: z.number().optional(),
});

export type CreateProject = z.input<typeof CreateProjectSchema>;
