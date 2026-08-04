import { z } from 'zod';

export const GetOptionsForContextSchema = z.object({
  /** The ID of the custom field. */
  fieldId: z.string(),
  /** The ID of the context. */
  contextId: z.number(),
  /** The ID of the option. */
  optionId: z.number().optional(),
  /** Whether only options are returned. */
  onlyOptions: z.boolean().optional(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
});

export type GetOptionsForContext = z.input<typeof GetOptionsForContextSchema>;
