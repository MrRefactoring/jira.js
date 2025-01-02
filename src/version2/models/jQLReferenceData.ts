import type { FieldReferenceData } from './fieldReferenceData.js';
import type { FunctionReferenceData } from './functionReferenceData.js';

/** Lists of JQL reference data. */
export interface JQLReferenceData {
  /** List of JQL query reserved words. */
  jqlReservedWords?: string[];
  /** List of fields usable in JQL queries. */
  visibleFieldNames?: FieldReferenceData[];
  /** List of functions usable in JQL queries. */
  visibleFunctionNames?: FunctionReferenceData[];
}
