import { IssueTypeScheme } from './issueTypeScheme';

/**
 * Issue type scheme with a list of the projects that use it. */
export interface IssueTypeSchemeProjects {
  /** Details of an issue type scheme. */
  issueTypeScheme: IssueTypeScheme[];
  /** The IDs of the projects using the issue type scheme. */
  projectIds: string[];
}
