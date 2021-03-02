import { ProjectIssueCreateMetadata } from './projectIssueCreateMetadata';

/**
 * The wrapper for the issue creation metadata for a list of projects. */
export interface IssueCreateMetadata {
  /** Expand options that include additional project details in the response. */
  expand?: string;
  /** List of projects and their issue creation metadata. */
  projects?: ProjectIssueCreateMetadata[];
}
