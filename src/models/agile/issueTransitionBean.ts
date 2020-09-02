export interface IssueTransitionBean {
    id: string;
    name: string;
    to: {
        [key: string]: unknown;
    };
    hasScreen: boolean;
    isGlobal: boolean;
    isInitial: boolean;
    isAvailable: boolean;
    isConditional: boolean;
    fields: {
        [key: string]: unknown;
    };
    expand: string;
}