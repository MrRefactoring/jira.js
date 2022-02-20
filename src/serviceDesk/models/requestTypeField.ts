import { JsonType } from './jsonType';
import { RequestTypeFieldValue } from './requestTypeFieldValue';

export interface RequestTypeField {
  /** ID of the field. */
  fieldId?: string;
  /** Name of the field. */
  name?: string;
  /** Description of the field. */
  description?: string;
  /** Indicates if the field is required (true) or not (false). */
  required?: boolean;
  /** List of default values for the field. */
  defaultValues?: RequestTypeFieldValue[];
  /** List of valid values for the field. */
  validValues?: RequestTypeFieldValue[];
  /** List of preset values for the field. */
  presetValues?: string[];
  jiraSchema?: JsonType;
  visible?: boolean;
}
