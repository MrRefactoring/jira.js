import { z } from 'zod';
import { apiObject } from '#/core';
import { SearchWarningLimitDetailsSchema } from './searchWarningLimitDetails';
/** Experimental. A warning returned alongside successful search results. */

export const SearchWarningSchema = apiObject({
  details: SearchWarningLimitDetailsSchema.optional(),
  /** A human-readable explanation of the warning suitable for surfacing to end users. */
  message: z.string().optional(),
  /** The type of warning, e.g. CLAUSE_LIMIT_EXCEEDED. */
  type: z.string().optional(),
});

export type SearchWarning = z.infer<typeof SearchWarningSchema>;
