export interface ErrorCollection {
  errorMessages: string[];
  errors: {
    [key: string]: unknown;
  };
  status: number;
}
