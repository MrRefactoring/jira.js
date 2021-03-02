import { IssueFilterForBulkPropertyDelete } from '../models';

export interface BulkDeleteIssueProperty extends IssueFilterForBulkPropertyDelete {
  /** The key of the property. */
  propertyKey: string;
}
