export interface GetAttachmentsForRequest {
  /** The ID or key of the customer request from which the attachments will be listed. */
  issueIdOrKey: string;
  /** The starting index of the returned attachment. Base index: 0. See the [Pagination](#pagination) section for more details. */
  start?: number;
  /** The maximum number of comments to return per page. Default: 50. See the [Pagination](#pagination) section for more details. */
  limit?: number;
}
