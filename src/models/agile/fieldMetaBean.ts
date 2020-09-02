export interface FieldMetaBean {
    required: boolean;
    schema: {
        [key: string]: unknown;
    };
    name: string;
    key: string;
    autoCompleteUrl: string;
    hasDefaultValue: boolean;
    operations: string[];
    allowedValues: any[];
    defaultValue: unknown;
}