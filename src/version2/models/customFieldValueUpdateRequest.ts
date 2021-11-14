import { CustomFieldValueUpdate } from './customFieldValueUpdate';

/** @deprecated Details of updates for a custom field. */
export interface CustomFieldValueUpdateRequest {
  /** The list of custom field update details. */
  updates?: CustomFieldValueUpdate[];
}
