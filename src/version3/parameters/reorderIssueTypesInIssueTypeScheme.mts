import { OrderOfIssueTypes } from '../models/index.mjs';

export interface ReorderIssueTypesInIssueTypeScheme extends OrderOfIssueTypes {
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: number;
}
