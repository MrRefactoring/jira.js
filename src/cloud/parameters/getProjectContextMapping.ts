import { z } from 'zod';

export const GetProjectContextMappingSchema = z.object({
  /** The ID of the custom field, for example `customfield\_10000`. */
  fieldId: z.string(),
  /**
   * The list of context IDs. To include multiple context, separate IDs with ampersand:
   * `contextId=10000&contextId=10001`.
   */
  contextId: z.array(z.number()).optional(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
});

export type GetProjectContextMapping = z.input<typeof GetProjectContextMappingSchema>;
