/** Change the order of issue priorities. */
export interface ReorderIssuePriorities {
  /** The ID of the priority. Required if `position` isn't provided. */
  after?: string;
  /** The list of issue IDs to be reordered. Cannot contain duplicates nor after ID. */
  ids: string[];
  /** The position for issue priorities to be moved to. Required if `after` isn't provided. */
  position?: string;
}
