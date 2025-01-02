import { Errors } from './errors.mjs';

/** Number of archived/unarchived issues and list of errors that occurred during the action, if any. */
export interface IssueArchivalSync {
  errors?: Errors;
  numberOfIssuesUpdated?: number;
}
