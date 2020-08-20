export interface ErrorCollection {
    errorMessages: string[];
    errors: {
        [key: string]: string;
    };
    status: number;
}
