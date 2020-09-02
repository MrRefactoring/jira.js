import { JsonTypeBean } from "./jsonTypeBean";

export interface FieldMetadata {
    required: boolean;
    schema?: JsonTypeBean[];
    name: string;
    key: string;
    autoCompleteUrl?: string;
    hasDefaultValue?: boolean;
    operations: string[];
    allowedValues?: any[];
    defaultValue?: unknown;
}