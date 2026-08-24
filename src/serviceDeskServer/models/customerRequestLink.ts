import { z } from 'zod';
import { apiObject } from '#/core';

export const CustomerRequestLinkSchema = apiObject({
  jiraRest: z.url().optional(),
  web: z.url().optional(),
  self: z.url().optional(),
});

export type CustomerRequestLink = z.infer<typeof CustomerRequestLinkSchema>;
