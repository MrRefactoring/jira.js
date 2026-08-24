import { z } from 'zod';
import { apiObject } from '#/core';

export const WebhookInputSchema = apiObject({
  name: z.string(),
  /** Where Jira posts the event. */
  url: z.string(),
  /** The events to deliver, e.g. `jira:issue_created`. */
  events: z.array(z.string()).optional(),
  /** Narrows what is delivered, e.g. `{ "issue-related-events-section": jql }`. */
  filters: z.record(z.string(), z.any()).optional(),
  /** Deliver the event without its body. */
  excludeBody: z.boolean().optional(),
  configuration: z.record(z.string(), z.any()).optional(),
  sslVerificationRequired: z.boolean().optional(),
});

export type WebhookInput = z.infer<typeof WebhookInputSchema>;
