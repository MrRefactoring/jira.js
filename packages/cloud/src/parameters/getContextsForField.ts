import { z } from 'zod';

export const GetContextsForFieldSchema = z.object({
  /** The ID of the custom field. */
  fieldId: z.string(),
  /** Whether to return contexts that apply to all issue types. */
  isAnyIssueType: z.boolean().optional(),
  /** Whether to return contexts that apply to all projects. */
  isGlobalContext: z.boolean().optional(),
  /**
   * The list of context IDs. To include multiple contexts, separate IDs with ampersand:
   * `contextId=10000&contextId=10001`.
   */
  contextId: z.array(z.number()).optional(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
});

export type GetContextsForField = z.input<typeof GetContextsForFieldSchema>;
