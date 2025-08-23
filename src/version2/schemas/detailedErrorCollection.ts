import { z } from 'zod';

export const DetailedErrorCollectionSchema = z.object({
  /** Map of objects representing additional details for an error */
  details: z.object({}).optional(),
  /** The list of error messages produced by this operation. For example, "input parameter 'key' must be provided" */
  errorMessages: z.array(z.string()).optional(),
  /**
   * The list of errors by parameter returned by the operation. For example,"projectKey": "Project keys must start with
   * an uppercase letter, followed by one or more uppercase alphanumeric characters."
   */
  errors: z.object({}).optional(),
});

export type DetailedErrorCollection = z.infer<typeof DetailedErrorCollectionSchema>;
