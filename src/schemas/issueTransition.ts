export interface Issuetransition {
    [key: string]: any;
    id: string;
    name: string;
    to: any;
    hasScreen: boolean;
    isGlobal: boolean;
    isInitial: boolean;
    isAvailable: boolean;
    isConditional: boolean;
    fields: any;
    expand: string;
}
