import type { IssueFilterForBulkPropertyDelete } from '../models/index.js';

export interface BulkDeleteIssueProperty extends IssueFilterForBulkPropertyDelete {
  /** The key of the property. */
  propertyKey: string;
}
