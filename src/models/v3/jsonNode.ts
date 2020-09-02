export interface JsonNode {
    int: boolean;
    object: boolean;
    containerNode: boolean;
    missingNode: boolean;
    valueNode: boolean;
    floatingPointNumber: boolean;
    elements: {
        [key: string]: unknown;
    };
    number: boolean;
    pojo: boolean;
    integralNumber: boolean;
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
    fieldNames: {
        [key: string]: unknown;
    };
    valueAsText: string;
    array: boolean;
    fields: {
        [key: string]: unknown;
    };
    null: boolean;
}