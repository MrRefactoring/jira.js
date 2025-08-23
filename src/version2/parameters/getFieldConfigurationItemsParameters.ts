import { z } from 'zod';

export const GetFieldConfigurationItemsParametersSchema = z.object({
  /** The ID of the field configuration. */
  id: z.number().int(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
});

export type GetFieldConfigurationItemsParameters = z.infer<typeof GetFieldConfigurationItemsParametersSchema>;
