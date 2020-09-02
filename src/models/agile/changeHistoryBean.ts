export interface ChangeHistoryBean {
    id: string;
    author: {
        [key: string]: unknown;
    };
    created: string;
    items: {
        field: string;
        fieldtype: string;
        fieldId: string;
        from: string;
        fromString: string;
        to: string;
        toString: string;
    }[];
    historyMetadata: {
        [key: string]: unknown;
    };
}