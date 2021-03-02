import { BulkIssuePropertyUpdateRequest } from '../models';

export interface BulkSetIssueProperty extends BulkIssuePropertyUpdateRequest {
  /** The key of the property. The maximum length is 255 characters. */
  propertyKey: string;
}
