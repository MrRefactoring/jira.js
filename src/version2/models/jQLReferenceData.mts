import { FieldReferenceData } from './fieldReferenceData.mjs';
import { FunctionReferenceData } from './functionReferenceData.mjs';

/** Lists of Jql reference data. */
export interface JQLReferenceData {
  /** List of Jql query reserved words. */
  jqlReservedWords?: string[];
  /** List of fields usable in Jql queries. */
  visibleFieldNames?: FieldReferenceData[];
  /** List of functions usable in Jql queries. */
  visibleFunctionNames?: FunctionReferenceData[];
}
