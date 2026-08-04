import { z } from 'zod';
import { apiObject } from '#/core';

export const JQLCountRequestSchema = apiObject({
  /**
   * A [JQL](https://confluence.atlassian.com/x/egORLQ) expression. For performance reasons, this parameter requires a
   * bounded query. A bounded query is a query with a search restriction.
   */
  jql: z.string().optional(),
});

export type JQLCountRequest = z.infer<typeof JQLCountRequestSchema>;
