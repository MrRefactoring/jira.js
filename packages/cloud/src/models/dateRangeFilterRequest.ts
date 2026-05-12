import { z } from 'zod';

/** List issues archived within a specified date range. */
export const DateRangeFilterRequestSchema = z.object({
  /** List issues archived after a specified date, passed in the YYYY-MM-DD format. */
  dateAfter: z.string(),
  /** List issues archived before a specified date provided in the YYYY-MM-DD format. */
  dateBefore: z.string(),
});

export type DateRangeFilterRequest = z.infer<typeof DateRangeFilterRequestSchema>;
