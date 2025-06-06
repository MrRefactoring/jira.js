import type { EntityPropertyDetails } from '../models';

export interface UpdateEntityPropertiesValue {
  /** The app migration transfer ID. */
  transferId: string;
  /** The Atlassian account ID of the impersonated user. This user must be a member of the site admin group. */
  accountId: string;
  /** The type indicating the object that contains the entity properties. */
  entityType:
    | 'IssueProperty'
    | 'CommentProperty'
    | 'DashboardItemProperty'
    | 'IssueTypeProperty'
    | 'ProjectProperty'
    | 'UserProperty'
    | 'WorklogProperty'
    | 'BoardProperty'
    | 'SprintProperty'
    | string;

  entities?: Array<EntityPropertyDetails>;
}
