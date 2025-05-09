import type { ConfigurationsListParameters } from '../models';

export interface GetCustomFieldsConfigurations extends ConfigurationsListParameters {
  /**
   * The list of configuration IDs. To include multiple configurations, separate IDs with an ampersand:
   * `id=10000&id=10001`. Can't be provided with `fieldContextId`, `issueId`, `projectKeyOrId`, or `issueTypeId`.
   */
  id?: number[];
  /**
   * The list of field context IDs. To include multiple field contexts, separate IDs with an ampersand:
   * `fieldContextId=10000&fieldContextId=10001`. Can't be provided with `id`, `issueId`, `projectKeyOrId`, or
   * `issueTypeId`.
   */
  fieldContextId?: number[];
  /**
   * The ID of the issue to filter results by. If the issue doesn't exist, an empty list is returned. Can't be provided
   * with `projectKeyOrId`, or `issueTypeId`.
   */
  issueId?: number;
  /**
   * The ID or key of the project to filter results by. Must be provided with `issueTypeId`. Can't be provided with
   * `issueId`.
   */
  projectKeyOrId?: string;
  /**
   * The ID of the issue type to filter results by. Must be provided with `projectKeyOrId`. Can't be provided with
   * `issueId`.
   */
  issueTypeId?: string;
  /** The index of the first item to return in a page of results (page offset). */
  startAt?: number;
  /** The maximum number of items to return per page. */
  maxResults?: number;
}
