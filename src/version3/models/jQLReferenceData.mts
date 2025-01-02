import { FieldReferenceData } from './fieldReferenceData.mjs';
import { FunctionReferenceData } from './functionReferenceData.mjs';

/** Lists of Jql reference data. */
export interface JQLReferenceData {
  /** List of fields usable in Jql queries. */
  visibleFieldNames?: FieldReferenceData[];
  /** List of functions usable in Jql queries. */
  visibleFunctionNames?: FunctionReferenceData[];
  /** List of Jql query reserved words. */
  jqlReservedWords?: string[];
}
