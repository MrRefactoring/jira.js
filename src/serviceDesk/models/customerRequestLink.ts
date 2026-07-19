import { z } from 'zod';
import { apiObject } from '#/core';

export const CustomerRequestLinkSchema = apiObject({
  /** Jira agent view URL for the request. */
  agent: z.string().url().optional(),
  /** REST API URL for the request. */
  jiraRest: z.string().url().optional(),
  self: z.string().url().optional(),
  /** Web URL for the request. */
  web: z.string().url().optional(),
});

export type CustomerRequestLink = z.infer<typeof CustomerRequestLinkSchema>;
