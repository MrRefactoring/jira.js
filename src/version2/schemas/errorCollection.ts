import { z } from 'zod';

/** Error messages from an operation. */
export const ErrorCollectionSchema = z.object({
  /** The list of error messages produced by this operation. For example, "input parameter 'key' must be provided" */
  errorMessages: z.array(z.string()).optional(),
  /**
   * The list of errors by parameter returned by the operation. For example,"projectKey": "Project keys must start with
   * an uppercase letter, followed by one or more uppercase alphanumeric characters."
   */
  errors: z.object({}).optional(),
  status: z.number().int().optional(),
});

export type ErrorCollection = z.infer<typeof ErrorCollectionSchema>;
