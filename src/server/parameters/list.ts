import { z } from 'zod';

export const ListSchema = z.object({
  /** An optional filter that is applied to the list of dashboards. */
  filter: z.string().optional(),
  /** A hint as to the maximum number of dashboards to return in each call. */
  maxResults: z.string().optional(),
  /** The index of the first dashboard to return (0-based). */
  startAt: z.string().optional(),
});

export type List = z.input<typeof ListSchema>;
