import { ConnectCustomFieldValue } from './connectCustomFieldValue.mjs';

/** Details of updates for a custom field. */
export interface ConnectCustomFieldValues {
  /** The list of custom field update details. */
  updateValueList?: ConnectCustomFieldValue[];
}
