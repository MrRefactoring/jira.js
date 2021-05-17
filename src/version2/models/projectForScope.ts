import { AvatarUrlsBean } from './avatarUrlsBean';
import { UpdatedProjectCategory } from './updatedProjectCategory';

/**
 * Details about a next-gen project. */
export interface ProjectForScope {
  /** The URL of the project details. */
  self?: string;
  /** The ID of the project. */
  id?: string;
  /** The key of the project. */
  key?: string;
  /** The name of the project. */
  name?: string;
  /** The [project type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes) of the project. */
  projectTypeKey?: string;
  /** Whether or not the project is simplified. */
  simplified?: boolean;
  avatarUrls?: AvatarUrlsBean;
  projectCategory?: UpdatedProjectCategory;
}
