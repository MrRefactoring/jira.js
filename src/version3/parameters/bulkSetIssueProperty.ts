import type { BulkIssuePropertyUpdateRequest } from '../models/index.js';

export interface BulkSetIssueProperty extends BulkIssuePropertyUpdateRequest {
  /** The key of the property. The maximum length is 255 characters. */
  propertyKey: string;
}
