import { CustomFieldOptionCreate } from './customFieldOptionCreate.mjs';

/** Details of the options to create for a custom field. */
export interface BulkCustomFieldOptionCreateRequest {
  /** Details of options to create. */
  options?: CustomFieldOptionCreate[];
}
