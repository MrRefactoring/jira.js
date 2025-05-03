import type { AvatarUrls } from './avatarUrls';

/** Details about a project. */
export interface Project {
  avatarUrls: AvatarUrls;
  /** The ID of the project. */
  id: string;
  /** The key of the project. */
  key: string;
  /** The name of the project. */
  name: string;
  /** A project category. */
  projectCategory: {
    /** The name of the project category. */
    description?: string;
    /** The ID of the project category. */
    id: string;
    /** The description of the project category. */
    name: string;
    /** The URL of the project category. */
    self: string;
  };
  /**
   * The [project
   * type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes) of the
   * project.
   */
  projectTypeKey: 'software' | 'service_desk' | 'business' | string;
  /** The URL of the project details. */
  self: string;
  /** Whether or not the project is simplified. */
  simplified: boolean;
}
