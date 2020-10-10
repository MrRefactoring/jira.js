export interface JsonNode {
  object: boolean;
  long: boolean;
  floatingPointNumber: boolean;
  elements: {
    [key: string]: unknown;
  };
  valueNode: boolean;
  missingNode: boolean;
  containerNode: boolean;
  int: boolean;
  number: boolean;
  pojo: boolean;
  integralNumber: boolean;
  bigDecimal: boolean;
  bigInteger: boolean;
  textual: boolean;
  boolean: boolean;
  binary: boolean;
  numberValue: number;
  numberType: string;
  intValue: number;
  longValue: number;
  bigIntegerValue: number;
  doubleValue: number;
  decimalValue: number;
  booleanValue: boolean;
  binaryValue: string[];
  valueAsInt: number;
  valueAsLong: number;
  valueAsDouble: number;
  valueAsBoolean: boolean;
  double: boolean;
  textValue: string;
  valueAsText: string;
  fieldNames: {
    [key: string]: unknown;
  };
  array: boolean;
  fields: {
    [key: string]: unknown;
  };
  null: boolean;
}
