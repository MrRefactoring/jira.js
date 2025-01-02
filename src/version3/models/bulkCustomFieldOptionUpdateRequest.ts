import type { CustomFieldOptionUpdate } from './customFieldOptionUpdate.js';

/** Details of the options to update for a custom field. */
export interface BulkCustomFieldOptionUpdateRequest {
  /** Details of the options to update. */
  options?: CustomFieldOptionUpdate[];
}
