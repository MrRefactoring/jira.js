import { z } from 'zod';

/** The description of the page of issues loaded by the provided JQL query. */
export const IssuesJqlMetaDataSchema = z.object({
  /** The number of issues that were loaded in this evaluation. */
  count: z.number(),
  /** The maximum number of issues that could be loaded in this evaluation. */
  maxResults: z.number(),
  /** The index of the first issue. */
  startAt: z.number(),
  /** The total number of issues the JQL returned. */
  totalCount: z.number(),
  /** Any warnings related to the JQL query. Present only if the validation mode was set to `warn`. */
  validationWarnings: z.array(z.string()).optional(),
});

export type IssuesJqlMetaData = z.infer<typeof IssuesJqlMetaDataSchema>;
