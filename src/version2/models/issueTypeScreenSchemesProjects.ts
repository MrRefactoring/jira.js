import { IssueTypeScreenScheme } from './issueTypeScreenScheme';

/**
 * Issue type screen scheme with a list of the projects that use it. */
export interface IssueTypeScreenSchemesProjects {
  issueTypeScreenScheme?: IssueTypeScreenScheme;
  /** The IDs of the projects using the issue type screen scheme. */
  projectIds: string[];
}
