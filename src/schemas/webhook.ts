export interface Webhook {
    id: number;
    jqlFilter: string;
    events: any[];
    expirationDate: number;
}
