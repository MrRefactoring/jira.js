import { ProjectIssueTypeMappings } from '../models';

export interface GetCustomFieldContextsForProjectsAndIssueTypes extends ProjectIssueTypeMappings {
  /** The ID of the custom field. */
  fieldId: string;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
}
