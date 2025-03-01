/** Request bean for bulk changelog retrieval */
export interface BulkChangelogRequest {
  /** List of field IDs to filter changelogs */
  fieldIds?: string[];
  /** List of issue IDs/keys to fetch changelogs for */
  issueIdsOrKeys: string[];
  /** The maximum number of items to return per page */
  maxResults?: number;
  /** The cursor for pagination */
  nextPageToken?: string;
}
