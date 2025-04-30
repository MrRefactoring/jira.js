import type { Error } from './error';

export interface Errors {
  issueIsSubtask?: Error;
  issuesInArchivedProjects?: Error;
  issuesInUnlicensedProjects?: Error;
  issuesNotFound?: Error;
}
