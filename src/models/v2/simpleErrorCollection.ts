export interface SimpleErrorCollection {
  errors: {
    [key: string]: unknown;
  };
  errorMessages: string[];
  httpStatusCode: number;
}
