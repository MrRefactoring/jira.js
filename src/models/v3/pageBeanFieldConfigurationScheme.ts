import { FieldConfigurationScheme } from "./fieldConfigurationScheme";

export interface PageBeanFieldConfigurationScheme {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: FieldConfigurationScheme[];
}