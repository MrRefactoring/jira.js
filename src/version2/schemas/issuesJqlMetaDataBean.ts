import { z } from 'zod';

/** The description of the page of issues loaded by the provided JQL query. */
export const IssuesJqlMetaDataBeanSchema = z.object({
  /** The number of issues that were loaded in this evaluation. */
  count: z.number().int(),
  /** The maximum number of issues that could be loaded in this evaluation. */
  maxResults: z.number().int(),
  /** The index of the first issue. */
  startAt: z.number().int(),
  /** The total number of issues the JQL returned. */
  totalCount: z.number().int(),
  /** Any warnings related to the JQL query. Present only if the validation mode was set to `warn`. */
  validationWarnings: z.array(z.string()).optional(),
});

export type IssuesJqlMetaDataBean = z.infer<typeof IssuesJqlMetaDataBeanSchema>;
