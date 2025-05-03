/** Issue Bulk Watch Or Unwatch Payload */
export interface IssueBulkWatchOrUnwatchPayload {
  /**
   * List of issue IDs or keys which are to be bulk watched or unwatched. These IDs or keys can be from different
   * projects and issue types.
   */
  selectedIssueIdsOrKeys: string[];
}
