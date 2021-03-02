import { OrderOfIssueTypes } from '../models';

export interface ReorderIssueTypesInIssueTypeScheme extends OrderOfIssueTypes {
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: number;
}
