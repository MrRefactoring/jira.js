import { IssueFilterForBulkPropertySet } from './issueFilterForBulkPropertySet';

/**
 * Bulk issue property update request details. */
export interface BulkIssuePropertyUpdateRequest {
  /** The value of the property. The value must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum length is 32768 characters. */
  value?: Record<string, any>;
  /** The bulk operation filter. */
  filter?: IssueFilterForBulkPropertySet[];
}
