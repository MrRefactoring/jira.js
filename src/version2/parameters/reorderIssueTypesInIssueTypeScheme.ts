import type { OrderOfIssueTypes } from '../models/index.js';

export interface ReorderIssueTypesInIssueTypeScheme extends OrderOfIssueTypes {
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: number;
}
