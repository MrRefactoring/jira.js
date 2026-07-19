import { z } from 'zod';

export const GetContextDefaultValuesSchema = z.object({
  /** The ID of the custom field, for example `customfield\_10000`. */
  fieldId: z.string(),
  /**
   * The IDs of the contexts to return default values for. If omitted, default values for every context the custom
   * field has are returned.
   */
  contextId: z.array(z.number()).optional(),
  /**
   * The IDs of the issue types to restrict the returned per-issue-type default values to. If omitted, default values
   * for every issue type are returned. This filter never removes the catch-all {@code isAnyIssueType} entry of a
   * context.
   */
  issueTypeId: z.array(z.string()).optional(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
});

export type GetContextDefaultValues = z.input<typeof GetContextDefaultValuesSchema>;
