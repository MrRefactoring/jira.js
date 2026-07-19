import { z } from 'zod';
import { apiObject } from '#/core';
/** Experimental. Structured details about a JQL clause exceeding its argument limit. */

export const SearchWarningLimitDetailsSchema = apiObject({
  /** The actual number of arguments supplied that exceeded the limit. */
  actual: z.number().optional(),
  /** The arguments passed to the JQL clause. */
  arguments: z.string().optional(),
  /** The JQL clause that triggered the limit, e.g. issueHistory(). */
  clause: z.string().optional(),
  /** The maximum number of arguments allowed for the clause. */
  limit: z.number().optional(),
});

export type SearchWarningLimitDetails = z.infer<typeof SearchWarningLimitDetailsSchema>;
