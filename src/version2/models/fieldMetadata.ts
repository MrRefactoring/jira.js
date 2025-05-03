/* eslint-disable @typescript-eslint/no-explicit-any */
import type { JsonType } from './jsonType';

/** The metadata describing an issue field. */
export interface FieldMetadata {
  /** The list of values allowed in the field. */
  allowedValues?: any[];
  /** The URL that can be used to automatically complete the field. */
  autoCompleteUrl?: string;
  /** The configuration properties. */
  configuration?: any;
  /** The default value of the field. */
  defaultValue?: any;
  /** Whether the field has a default value. */
  hasDefaultValue?: boolean;
  /** The key of the field. */
  key: string;
  /** The name of the field. */
  name: string;
  /** The list of operations that can be performed on the field. */
  operations: string[];
  /** Whether the field is required. */
  required: boolean;
  schema?: JsonType;
}
