export interface Searchrequestbean {
    jql: string;
    startAt: number;
    maxResults: number;
    fields: any[];
    validateQuery: string;
    expand: any[];
    properties: any[];
    fieldsByKeys: boolean;
}
