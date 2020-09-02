export interface SearchRequestBean {
    jql: string;
    startAt: number;
    maxResults: number;
    fields: string[];
    validateQuery: string;
    expand: string[];
    properties: string[];
    fieldsByKeys: boolean;
}