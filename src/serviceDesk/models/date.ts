import { z } from 'zod';
import { apiObject } from '#/core';

export const DateSchema = apiObject({
  /**
   * Date as the number of milliseconds that have elapsed since 00:00:00 Coordinated Universal Time (UTC), 1 January
   * 1970.
   */
  epochMillis: z.number().optional(),
  /** Date in a user-friendly text format. */
  friendly: z.string().optional(),
  /** Date in ISO8601 format. */
  iso8601: z.string().optional(),
  /**
   * Date in the format used in the Jira REST APIs, which is ISO8601 format but extended with milliseconds. For
   * example, 2016-09-28T23:08:32.097+1000.
   */
  jira: z.string().optional(),
});

export type Date = z.infer<typeof DateSchema>;
