export interface GetWorklog {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
  /** The ID of the worklog. */
  id: string;
  /** Use [expand](#expansion) to include additional information about work logs in the response. This parameter accepts

   `properties`, which returns worklog properties. */
  expand?: string;
}
