import { z } from 'zod';

export const JQLCountRequestBeanSchema = z.object({
  /**
   * A [JQL](https://confluence.atlassian.com/x/egORLQ) expression. For performance reasons, this parameter requires a
   * bounded query. A bounded query is a query with a search restriction.
   */
  jql: z.string().optional(),
});

export type JQLCountRequestBean = z.infer<typeof JQLCountRequestBeanSchema>;
