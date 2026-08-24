import { z } from 'zod';
import { openEnum } from '#/core';

export const GetEventsSchema = z.object({
  /**
   * Your organization has a unique ID. Find this ID in your Atlassian Administration URL or when you create your API
   * key.
   */
  orgId: z.string(),
  /** Sets the starting point for the page of results to return */
  cursor: z.string().optional(),
  /** Single query term for searching events. */
  q: z.string().optional(),
  /** The earliest date and time of the event represented as a UNIX epoch time in milliseconds. */
  from: z.string().optional(),
  /** The latest date and time of the event represented as a UNIX epoch time in milliseconds. */
  to: z.string().optional(),
  /** A query filter that returns events of a specific action type. */
  action: z.string().optional(),
  /** A query filter that returns events by one or more specific actors. */
  actor: z.array(z.string()).optional(),
  /** A query filter that returns events by one or more specific ip addresses. */
  ip: z.array(z.string()).optional(),
  /** A query filter that returns events by one or more specific products. */
  product: z.array(openEnum(['bitbucket', 'confluence', 'guard_detect', 'jira', 'loom'])).optional(),
  /**
   * A query filter that returns events by one or more specific locations. Of format: [ { "city": "", "countryName": ""
   * }, ... ]
   */
  location: z.string().optional(),
  /** The maximum number of events to return per page. */
  limit: z.number().optional(),
});

export type GetEvents = z.input<typeof GetEventsSchema>;
