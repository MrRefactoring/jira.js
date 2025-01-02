import { Error } from './error.mjs';

export interface Errors {
  issueIsSubtask?: Error;
  issuesInArchivedProjects?: Error;
  issuesInUnlicensedProjects?: Error;
  issuesNotFound?: Error;
}
