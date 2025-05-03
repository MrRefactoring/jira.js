import type { AvatarUrls } from './avatarUrls';
import type { Hierarchy } from './hierarchy';
import type { IssueTypeDetails } from './issueTypeDetails';
import type { ProjectCategory } from './projectCategory';
import type { ProjectComponent } from './projectComponent';
import type { ProjectInsight } from './projectInsight';
import type { ProjectLandingPageInfo } from './projectLandingPageInfo';
import type { ProjectPermissions } from './projectPermissions';
import type { User } from './user';
import type { Version } from './version';

/** Details about a project. */
export interface Project {
  /** Whether the project is archived. */
  archived?: boolean;
  archivedBy?: User;
  /** The date when the project was archived. */
  archivedDate?: string;
  /** The default assignee when creating issues for this project. */
  assigneeType?: string;
  avatarUrls?: AvatarUrls;
  /** List of the components contained in the project. */
  components?: ProjectComponent[];
  /** Whether the project is marked as deleted. */
  deleted?: boolean;
  deletedBy?: User;
  /** The date when the project was marked as deleted. */
  deletedDate?: string;
  /** A brief description of the project. */
  description?: string;
  /** An email address associated with the project. */
  email?: string;
  /** Expand options that include additional project details in the response. */
  expand?: string;
  /** Whether the project is selected as a favorite. */
  favourite?: boolean;
  /** The ID of the project. */
  id?: string;
  insight?: ProjectInsight;
  /** Whether the project is private. */
  isPrivate?: boolean;
  issueTypeHierarchy?: Hierarchy;
  /** List of the issue types available in the project. */
  issueTypes?: IssueTypeDetails[];
  /** The key of the project. */
  key?: string;
  landingPageInfo?: ProjectLandingPageInfo;
  lead?: User;
  /** The name of the project. */
  name?: string;
  permissions?: ProjectPermissions;
  projectCategory?: ProjectCategory;
  /**
   * The [project
   * type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes) of the
   * project.
   */
  projectTypeKey?: string;
  /** Map of project properties */
  properties?: unknown;
  /** The date when the project is deleted permanently. */
  retentionTillDate?: string;
  /**
   * The name and self URL for each role defined in the project. For more information, see [Create project
   * role](#api-rest-api-2-role-post).
   */
  roles?: unknown;
  /** The URL of the project details. */
  self?: string;
  /** Whether the project is simplified. */
  simplified?: boolean;
  /** The type of the project. */
  style?: string;
  /** A link to information about this project, such as project documentation. */
  url?: string;
  /** Unique ID for next-gen projects. */
  uuid?: string;
  /** The versions defined in the project. For more information, see [Create version](#api-rest-api-2-version-post). */
  versions?: Version[];
}
