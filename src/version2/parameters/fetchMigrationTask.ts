export interface FetchMigrationTask {
  /** The key of the Connect app that contains the Jira issue field being migrated. */
  connectKey: string;
  /** The module key of the Connect issue field being migrated. */
  jiraIssueFieldsKey: string;
}
