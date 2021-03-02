export interface GetApplicationProperty {
  /** The key of the application property. */
  key?: string;
  /** The permission level of all items being returned in the list. */
  permissionLevel?: string;
  /** When a `key` isn't provided, this filters the list of results by the application property `key` using a regular expression. For example, using `jira.lf.*` will return all application properties with keys that start with *jira.lf.*. */
  keyFilter?: string;
}
