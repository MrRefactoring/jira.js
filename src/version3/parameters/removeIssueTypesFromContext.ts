import { IssueTypeIds } from '../models';

export interface RemoveIssueTypesFromContext extends IssueTypeIds {
  /** The ID of the custom field. */
  fieldId: string;
  /** The ID of the context. */
  contextId: number;
}
