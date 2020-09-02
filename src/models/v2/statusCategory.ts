export interface StatusCategory {
    self: string;
    id: number;
    key: string;
    colorName: string;
    name: string;
    [key: string]: unknown;
}