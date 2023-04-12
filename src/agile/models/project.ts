import { AvatarUrls } from './avatarUrls';

/** Details about a project. */
export interface Project {
  /** The URL of the project details. */
  self: string;
  /** The ID of the project. */
  id: string;
  /** The key of the project. */
  key: string;
  /** The name of the project. */
  name: string;
  /**
   * The [project
   * type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes) of the
   * project.
   */
  projectTypeKey: string;
  /** Whether the project is simplified. */
  simplified: boolean;
  /** The avatar URLs of the project. */
  avatarUrls: AvatarUrls;
}
