export interface JsonNode {
  array?: boolean;
  bigDecimal?: boolean;
  bigInteger?: boolean;
  bigIntegerValue?: number;
  binary?: boolean;
  binaryValue?: string[];
  boolean?: boolean;
  booleanValue?: boolean;
  containerNode?: boolean;
  decimalValue?: number;
  double?: boolean;
  doubleValue?: number;
  elements?: {};
  fieldNames?: {};
  fields?: {};
  floatingPointNumber?: boolean;
  int?: boolean;
  intValue?: number;
  integralNumber?: boolean;
  long?: boolean;
  longValue?: number;
  missingNode?: boolean;
  null?: boolean;
  number?: boolean;
  numberType?: 'INT' | 'LONG' | 'BIG_INTEGER' | 'FLOAT' | 'DOUBLE' | 'BIG_DECIMAL' | string;
  numberValue?: number;
  object?: boolean;
  pojo?: boolean;
  textValue?: string;
  textual?: boolean;
  valueAsBoolean?: boolean;
  valueAsDouble?: number;
  valueAsInt?: number;
  valueAsLong?: number;
  valueAsText?: string;
  valueNode?: boolean;
}
