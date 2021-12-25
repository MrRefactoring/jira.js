export interface GetArticles {
  serviceDeskId: string;
  /** The string used to filter the articles (required). */
  query?: string;
  /** If set to true matching query term in the title and excerpt will be highlighted using the {@code */
  highlight?: boolean;
  /** The starting index of the returned objects. Base index: 0. See the [Pagination](#pagination) section for more details. */
  start?: number;
  /** The maximum number of items to return per page. Default: 100. See the [Pagination](#pagination) section for more details. */
  limit?: number;
}
