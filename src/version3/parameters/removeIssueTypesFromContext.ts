import type { IssueTypeIds } from '../models/index.js';

export interface RemoveIssueTypesFromContext extends IssueTypeIds {
  /** The ID of the custom field. */
  fieldId: string;
  /** The ID of the context. */
  contextId: number;
}
