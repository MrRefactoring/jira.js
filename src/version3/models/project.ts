import { AvatarUrls } from './avatarUrls';
import { Component } from './component';
import { Hierarchy } from './hierarchy';
import { IssueTypeDetails } from './issueTypeDetails';
import { ProjectCategory } from './projectCategory';
import { ProjectInsight } from './projectInsight';
import { ProjectLandingPageInfo } from './projectLandingPageInfo';
import { ProjectPermissions } from './projectPermissions';
import { User } from './user';
import { Version } from './version';

/** Details about a project. */
export interface Project {
  /** Expand options that include additional project details in the response. */
  expand?:
  | 'description'
  | 'issueTypes'
  | 'lead'
  | 'projectKeys'
  | 'issueTypeHierarchy'
  | ('description' | 'issueTypes' | 'lead' | 'projectKeys' | 'issueTypeHierarchy')[]
  | string
  | string[];
  /** The URL of the project details. */
  self?: string;
  /** The ID of the project. */
  id: string;
  /** The key of the project. */
  key: string;
  /** A brief description of the project. */
  description?: string;
  lead: User;
  /** List of the components contained in the project. */
  components?: Component[];
  /** List of the issue types available in the project. */
  issueTypes?: IssueTypeDetails[];
  /** A link to information about this project, such as project documentation. */
  url?: string;
  /** An email address associated with the project. */
  email?: string;
  /** The default assignee when creating issues for this project. */
  assigneeType?: string;
  /** The versions defined in the project. For more information, see [Create version](#api-rest-api-3-version-post). */
  versions?: Version[];
  /** The name of the project. */
  name: string;
  /**
   * The name and self URL for each role defined in the project. For more information, see [Create project
   * role](#api-rest-api-3-role-post).
   */
  roles?: {};
  avatarUrls?: AvatarUrls;
  projectCategory?: ProjectCategory;
  /**
   * The [project
   * type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes) of the project.
   */
  projectTypeKey?: string;
  /** Whether the project is simplified. */
  simplified?: boolean;
  /** The type of the project. */
  style?: string;
  /** Whether the project is selected as a favorite. */
  favourite?: boolean;
  /** Whether the project is private. */
  isPrivate?: boolean;
  issueTypeHierarchy?: Hierarchy;
  permissions?: ProjectPermissions;
  /** Map of project properties */
  properties?: {};
  /** Unique ID for next-gen projects. */
  uuid?: string;
  insight?: ProjectInsight;
  /** Whether the project is marked as deleted. */
  deleted?: boolean;
  /** The date when the project is deleted permanently. */
  retentionTillDate?: string;
  /** The date when the project was marked as deleted. */
  deletedDate?: string;
  deletedBy?: User;
  /** Whether the project is archived. */
  archived?: boolean;
  /** The date when the project was archived. */
  archivedDate?: string;
  archivedBy?: User;
  landingPageInfo?: ProjectLandingPageInfo;
}

export namespace Project {
  export enum Expand {
    Description = 'description',
    IssueTypes = 'issueTypes',
    Lead = 'lead',
    ProjectKeys = 'projectKeys',
    IssueTypeHierarchy = 'issueTypeHierarchy',
  }
}
