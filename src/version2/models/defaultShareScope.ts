/**
 * Details of the scope of the default sharing for new filters and dashboards. */
export interface DefaultShareScope {
  /** The scope of the default sharing for new filters and dashboards:

   *  `AUTHENTICATED` Shared with all logged-in users.
   *  `GLOBAL` Shared with all logged-in users. This shows as `AUTHENTICATED` in the response.
   *  `PRIVATE` Not shared with any users. */
  scope: string;
}
