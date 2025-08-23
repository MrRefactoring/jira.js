import { z } from 'zod';

export const GetAllLabelsParametersSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
});

export type GetAllLabelsParameters = z.infer<typeof GetAllLabelsParametersSchema>;
