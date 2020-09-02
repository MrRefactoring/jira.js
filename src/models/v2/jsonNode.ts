export interface JsonNode {
    elements: {
        [key: string]: unknown;
    };
    number: boolean;
    valueNode: boolean;
    containerNode: boolean;
    missingNode: boolean;
    object: boolean;
    pojo: boolean;
    integralNumber: boolean;
    floatingPointNumber: boolean;
    int: boolean;
    long: boolean;
    double: boolean;
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