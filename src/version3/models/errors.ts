import type { Error } from './error.js';

export interface Errors {
  issueIsSubtask?: Error;
  issuesInArchivedProjects?: Error;
  issuesInUnlicensedProjects?: Error;
  issuesNotFound?: Error;
}
