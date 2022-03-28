export interface GetRecent {
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#expansion) to include additional
   * information in the response. This parameter accepts a comma-separated list. Expanded options include:
   *
   * - `description` Returns the project description.
   * - `projectKeys` Returns all project keys associated with a project.
   * - `lead` Returns information about the project lead.
   * - `issueTypes` Returns all issue types associated with the project.
   * - `url` Returns the URL associated with the project.
   * - `permissions` Returns the permissions associated with the project.
   * - `insight` EXPERIMENTAL. Returns the insight details of total issue count and last issue update time for the project.
   * - `*` Returns the project with all available expand options.
   */
  expand?:
  | 'description'
  | 'projectKeys'
  | 'lead'
  | 'issueTypes'
  | 'url'
  | 'permissions'
  | 'insight'
  | '*'
  | ('description' | 'projectKeys' | 'lead' | 'issueTypes' | 'url' | 'permissions' | 'insight' | '*')[]
  | string
  | string[]
  | GetRecent.Expand
  | GetRecent.Expand[];
  /**
   * EXPERIMENTAL. A list of project properties to return for the project. This parameter accepts a comma-separated
   * list. Invalid property names are ignored.
   */
  properties?: string[];
}

export namespace GetRecent {
  export enum Expand {
    /** Returns the project description. */
    Description = 'description',
    /** Returns all project keys associated with a project. */
    ProjectKeys = 'projectKeys',
    /** Returns information about the project lead. */
    Lead = 'lead',
    /** Returns all issue types associated with the project. */
    IssueTypes = 'issueTypes',
    /** Returns the URL associated with the project. */
    Url = 'url',
    /** Returns the permissions associated with the project. */
    Permissions = 'permissions',
    /** EXPERIMENTAL. Returns the insight details of total issue count and last issue update time for the project. */
    Insight = 'insight',
    /** Returns the project with all available expand options. */
    All = '*',
  }
}
