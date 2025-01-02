export interface SearchEpics {
  /** The maximum number of returned results. */
  maxResults?: number;
  /** Flag that will exclude done epics from the results. */
  excludeDone?: boolean;
  /** Text query by which the results should be filtered. */
  query?: string;
  /** Key of a project by which epics will be prioritised (on the top) in the results. */
  projectKey?: string;
}
