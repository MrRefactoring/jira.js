import { z } from 'zod';

export const GetAllLabelsSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
});

export type GetAllLabels = z.input<typeof GetAllLabelsSchema>;
