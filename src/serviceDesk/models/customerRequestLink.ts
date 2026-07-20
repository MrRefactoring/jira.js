import { z } from 'zod';
import { apiObject } from '#/core';

export const CustomerRequestLinkSchema = apiObject({
  /** Jira agent view URL for the request. */
  agent: z.url().optional(),
  /** REST API URL for the request. */
  jiraRest: z.url().optional(),
  self: z.url().optional(),
  /** Web URL for the request. */
  web: z.url().optional(),
});

export type CustomerRequestLink = z.infer<typeof CustomerRequestLinkSchema>;
