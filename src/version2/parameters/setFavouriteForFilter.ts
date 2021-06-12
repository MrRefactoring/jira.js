export interface SetFavouriteForFilter {
  /** The ID of the filter. */
  id: number;
  /**
   * Use [expand](#expansion) to include additional information about filter in the response. This parameter accepts a
   * comma-separated list. Expand options include:
   *
   * `sharedUsers` Returns the users that the filter is shared with. This includes users that can browse projects that
   * the filter is shared with. If you don't specify `sharedUsers`, then the `sharedUsers` object is returned but it
   * doesn't list any users. The list of users returned is limited to 1000, to access additional users append
   * `[start-index:end-index]` to the expand request. For example, to access the next 1000 users, use
   * `?expand=sharedUsers[1001:2000]`. `subscriptions` Returns the users that are subscribed to the filter. If you don't
   * specify `subscriptions`, the `subscriptions` object is returned but it doesn't list any subscriptions. The list of
   * subscriptions returned is limited to 1000, to access additional subscriptions append `[start-index:end-index]` to
   * the expand request. For example, to access the next 1000 subscriptions, use `?expand=subscriptions[1001:2000]`.
   */
  expand?: string;
}
