import { z } from 'zod';

export const GetIssueTypeMappingsForContextsParametersSchema = z.object({
  /** The ID of the custom field. */
  fieldId: z.string(),
  /**
   * The ID of the context. To include multiple contexts, provide an ampersand-separated list. For example,
   * `contextId=10001&contextId=10002`.
   */
  contextId: z.array(z.number().int()).optional(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
});

export type GetIssueTypeMappingsForContextsParameters = z.infer<typeof GetIssueTypeMappingsForContextsParametersSchema>;
