import { z } from 'zod';
import { DashboardUserSchema } from '#/models/dashboardUser';
import { AvatarUrlsSchema } from '#/models/avatarUrls';
import { ProjectComponentSchema } from '#/models/projectComponent';
import { ProjectInsightSchema } from '#/models/projectInsight';
import { HierarchySchema } from '#/models/hierarchy';
import { IssueTypeDetailsSchema } from '#/models/issueTypeDetails';
import { ProjectLandingPageInfoSchema } from '#/models/projectLandingPageInfo';
import { ProjectPermissionsSchema } from '#/models/projectPermissions';
import { ProjectCategorySchema } from '#/models/projectCategory';
import { VersionSchema } from '#/models/version';

/** Details about a project. */
export const ProjectSchema = z.object({
  /** Whether the project is archived. */
  archived: z.boolean().optional(),
  archivedBy: DashboardUserSchema.optional(),
  /** The date when the project was archived. */
  archivedDate: z
    .string()
    .transform(s => new Date(s))
    .optional(),
  /** The default assignee when creating issues for this project. */
  assigneeType: z.enum(['PROJECT_LEAD', 'UNASSIGNED']).optional(),
  avatarUrls: AvatarUrlsSchema.optional(),
  /** List of the components contained in the project. */
  components: z.array(ProjectComponentSchema).optional(),
  /** Whether the project is marked as deleted. */
  deleted: z.boolean().optional(),
  deletedBy: DashboardUserSchema.optional(),
  /** The date when the project was marked as deleted. */
  deletedDate: z
    .string()
    .transform(s => new Date(s))
    .optional(),
  /** A brief description of the project. */
  description: z.string().optional(),
  /** An email address associated with the project. */
  email: z.string().optional(),
  /** Expand options that include additional project details in the response. */
  expand: z.string().optional(),
  /** Whether the project is selected as a favorite. */
  favourite: z.boolean().optional(),
  /** The ID of the project. */
  id: z.string().optional(),
  insight: ProjectInsightSchema.optional(),
  /**
   * Whether the project is private from the user's perspective. This means the user can't see the project or any
   * associated issues.
   */
  isPrivate: z.boolean().optional(),
  issueTypeHierarchy: HierarchySchema.optional(),
  /** List of the issue types available in the project. */
  issueTypes: z.array(IssueTypeDetailsSchema).optional(),
  /** The key of the project. */
  key: z.string().optional(),
  landingPageInfo: ProjectLandingPageInfoSchema.optional(),
  lead: DashboardUserSchema.optional(),
  /** The name of the project. */
  name: z.string().optional(),
  permissions: ProjectPermissionsSchema.optional(),
  projectCategory: ProjectCategorySchema.optional(),
  /**
   * The [project
   * type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes) of the
   * project.
   */
  projectTypeKey: z.enum(['software', 'service_desk', 'business']).optional(),
  /** Map of project properties */
  properties: z.record(z.string(), z.any()).optional(),
  /** The date when the project is deleted permanently. */
  retentionTillDate: z
    .string()
    .transform(s => new Date(s))
    .optional(),
  /**
   * The name and self URL for each role defined in the project. For more information, see [Create project
   * role](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-role/#api-rest-api-3-role-post).
   */
  roles: z.record(z.string(), z.any()).optional(),
  /** The URL of the project details. */
  self: z.url().optional(),
  /** Whether the project is simplified. */
  simplified: z.boolean().optional(),
  /** The type of the project. */
  style: z.enum(['classic', 'next-gen']).optional(),
  /** A link to information about this project, such as project documentation. */
  url: z.string().optional(),
  /** Unique ID for next-gen projects. */
  uuid: z.string().optional(),
  /**
   * The versions defined in the project. For more information, see [Create
   * version](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-version/#api-rest-api-3-version-post).
   */
  versions: z.array(VersionSchema).optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
