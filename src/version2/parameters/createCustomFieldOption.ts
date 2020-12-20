import { BulkCustomFieldOptionCreateRequest } from '../models';

export interface CreateCustomFieldOption extends BulkCustomFieldOptionCreateRequest {
  /** The ID of the custom field. */
  fieldId: string;
  /** The ID of the context. */
  contextId: number;
}
