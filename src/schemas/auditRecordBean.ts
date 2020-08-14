export interface Auditrecordbean {
    id: number;
    summary: string;
    remoteAddress: string;
    authorKey: string;
    created: string;
    category: string;
    eventSource: string;
    description: string;
    objectItem: any;
    changedValues: any[];
    associatedItems: any[];
}
