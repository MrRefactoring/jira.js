export interface GetVersion {
  /** The ID of the version. */
  id: string;
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information about version in the response. This parameter accepts a comma-separated list. Expand options include:
   *
   * - `operations` Returns the list of operations available for this version.
   * - `issuesstatus` Returns the count of issues in this version for each of the status categories _to do_, _in
   *   progress_, _done_, and _unmapped_. The _unmapped_ property represents the number of issues with a status other
   *   than _to do_, _in progress_, and _done_.
   */
  expand?: 'operations' | 'issuesstatus' | ('operations' | 'issuesstatus')[] | string | string[];
}
