/**The metadata describing an issue field.*/
export interface FieldMetadata {
    /**Whether the field is required.*/
    required: boolean;
    /**The data type of the field.*/
    schema?: JsonTypeBean[];
    /**The name of the field.*/
    name: string;
    /**The key of the field.*/
    key: string;
    /**The URL that can be used to automatically complete the field.*/
    autoCompleteUrl?: string;
    /**Whether the field has a default value.*/
    hasDefaultValue?: boolean;
    /**The list of operations that can be performed on the field.*/
    operations: string[];
    /**The list of values allowed in the field.*/
    allowedValues?: Record<string, any>[];
    /**The default value of the field.*/
    defaultValue?: Record<string, any>;
}