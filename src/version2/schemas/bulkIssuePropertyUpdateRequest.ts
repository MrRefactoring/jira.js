import { z } from 'zod';

/** Bulk issue property update request details. */
export const BulkIssuePropertyUpdateRequestSchema = z.object({
  /**
   * EXPERIMENTAL. The Jira expression to calculate the value of the property. The value of the expression must be an
   * object that can be converted to JSON, such as a number, boolean, string, list, or map. The context variables
   * available to the expression are `issue` and `user`. Issues for which the expression returns a value whose JSON
   * representation is longer than 32768 characters are ignored.
   */
  expression: z.string().optional(),
  /** The bulk operation filter. */
  filter: z.unknown().optional(),
  /**
   * The value of the property. The value must be a [valid](https://tools.ietf.org/html/rfc4627), non-empty JSON blob.
   * The maximum length is 32768 characters.
   */
  value: z.unknown().optional(),
});

export type BulkIssuePropertyUpdateRequest = z.infer<typeof BulkIssuePropertyUpdateRequestSchema>;
