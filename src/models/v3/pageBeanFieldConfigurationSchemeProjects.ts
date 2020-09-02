import { FieldConfigurationSchemeProjects } from "./fieldConfigurationSchemeProjects";

export interface PageBeanFieldConfigurationSchemeProjects {
    self: string;
    nextPage: string;
    maxResults: number;
    startAt: number;
    total: number;
    isLast: boolean;
    values: FieldConfigurationSchemeProjects[];
}