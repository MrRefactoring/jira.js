export interface GetServiceDesks {
  /** The starting index of the returned objects. Base index: 0. See the [Pagination](#pagination) section for more details. */
  start?: number;
  /** The maximum number of items to return per page. Default: 100. See the [Pagination](#pagination) section for more details. */
  limit?: number;
}
