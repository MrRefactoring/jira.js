import { z } from 'zod';
import { ProjectComponentSchema } from './projectComponent';
import { IssueTypeDetailsSchema } from './issueTypeDetails';
import { VersionSchema } from './version';

/** Details about a project. */
export const ProjectSchema = z.object({
  /** Whether the project is archived. */
  archived: z.boolean().optional(),
  /** The user who archived the project. */
  archivedBy: z.unknown().optional(),
  /** The date when the project was archived. */
  archivedDate: z.string().datetime().optional(),
  /** The default assignee when creating issues for this project. */
  assigneeType: z.enum(['PROJECT_LEAD', 'UNASSIGNED']).optional(),
  /** The URLs of the project's avatars. */
  avatarUrls: z.unknown().optional(),
  /** List of the components contained in the project. */
  components: z.array(ProjectComponentSchema).optional(),
  /** Whether the project is marked as deleted. */
  deleted: z.boolean().optional(),
  /** The user who marked the project as deleted. */
  deletedBy: z.unknown().optional(),
  /** The date when the project was marked as deleted. */
  deletedDate: z.string().datetime().optional(),
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
  /** Insights about the project. */
  insight: z.unknown().optional(),
  /**
   * Whether the project is private from the user's perspective. This means the user can't see the project or any
   * associated issues.
   */
  isPrivate: z.boolean().optional(),
  /** The issue type hierarchy for the project. */
  issueTypeHierarchy: z.unknown().optional(),
  /** List of the issue types available in the project. */
  issueTypes: z.array(IssueTypeDetailsSchema).optional(),
  /** The key of the project. */
  key: z.string().optional(),
  /** The project landing page info. */
  landingPageInfo: z.unknown().optional(),
  /** The username of the project lead. */
  lead: z.unknown().optional(),
  /** The name of the project. */
  name: z.string().optional(),
  /** User permissions on the project */
  permissions: z.unknown().optional(),
  /** The category the project belongs to. */
  projectCategory: z.unknown().optional(),
  /**
   * The [project
   * type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes) of the
   * project.
   */
  projectTypeKey: z.enum(['software', 'service_desk', 'business']).optional(),
  /** Map of project properties */
  properties: z.object({}).optional(),
  /** The date when the project is deleted permanently. */
  retentionTillDate: z.string().datetime().optional(),
  /**
   * The name and self URL for each role defined in the project. For more information, see [Create project
   * role](#api-rest-api-2-role-post).
   */
  roles: z.object({}).optional(),
  /** The URL of the project details. */
  self: z.string().optional(),
  /** Whether the project is simplified. */
  simplified: z.boolean().optional(),
  /** The type of the project. */
  style: z.enum(['classic', 'next-gen']).optional(),
  /** A link to information about this project, such as project documentation. */
  url: z.string().optional(),
  /** Unique ID for next-gen projects. */
  uuid: z.string().optional(),
  /** The versions defined in the project. For more information, see [Create version](#api-rest-api-2-version-post). */
  versions: z.array(VersionSchema).optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
