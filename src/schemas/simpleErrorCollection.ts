export interface SimpleErrorCollection {
    errors: {
        [key: string]: string;
    };
    errorMessages: string[];
    httpStatusCode: number;
}
