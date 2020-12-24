import { IssueTypeIDs } from '../models';

export interface AddIssueTypesToContext extends IssueTypeIDs {
  /** The ID of the custom field. */
  fieldId: string;
  /** The ID of the context. */
  contextId: number;
}
