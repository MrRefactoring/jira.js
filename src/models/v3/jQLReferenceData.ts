import { FieldReferenceData } from './fieldReferenceData';
import { FunctionReferenceData } from './functionReferenceData';

export interface JQLReferenceData {
  visibleFieldNames: FieldReferenceData[];
  visibleFunctionNames: FunctionReferenceData[];
  jqlReservedWords: string[];
}
