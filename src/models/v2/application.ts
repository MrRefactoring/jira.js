export interface Application {
    type: string;
    name: string;
    [key: string]: unknown;
}