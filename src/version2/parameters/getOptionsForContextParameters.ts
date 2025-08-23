import { z } from 'zod';

export const GetOptionsForContextParametersSchema = z.object({
  /** The ID of the custom field. */
  fieldId: z.string(),
  /** The ID of the context. */
  contextId: z.number().int(),
  /** The ID of the option. */
  optionId: z.number().int().optional(),
  /** Whether only options are returned. */
  onlyOptions: z.boolean().optional(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
});

export type GetOptionsForContextParameters = z.infer<typeof GetOptionsForContextParametersSchema>;
