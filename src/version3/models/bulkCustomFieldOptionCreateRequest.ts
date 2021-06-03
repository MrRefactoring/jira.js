import { CustomFieldOptionCreate } from './customFieldOptionCreate';

/** Details of the options to create for a custom field. */
export interface BulkCustomFieldOptionCreateRequest {
  /** Details of options to create. */
  options?: CustomFieldOptionCreate[];
}
