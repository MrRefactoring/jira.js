import { IssueFilterForBulkPropertyDelete } from '../models/index.mjs';

export interface BulkDeleteIssueProperty extends IssueFilterForBulkPropertyDelete {
  /** The key of the property. */
  propertyKey: string;
}
