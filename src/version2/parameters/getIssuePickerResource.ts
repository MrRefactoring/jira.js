export interface GetIssuePickerResource {
  /** A string to match against text fields in the issue such as title, description, or comments. */
  query?: string;
  /** A JQL query defining a list of issues to search for the query term. Note that `username` and `userkey` cannot be used as search terms for this parameter, due to privacy reasons. Use `accountId` instead. */
  currentJQL?: string;
  /** The key of an issue to exclude from search results. For example, the issue the user is viewing when they perform this query. */
  currentIssueKey?: string;
  /** The ID of a project that suggested issues must belong to. */
  currentProjectId?: string;
  /** Indicate whether to include subtasks in the suggestions list. */
  showSubTasks?: boolean;
  /** When `currentIssueKey` is a subtask, whether to include the parent issue in the suggestions if it matches the query. */
  showSubTaskParent?: boolean;
}
