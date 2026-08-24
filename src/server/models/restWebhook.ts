import { z } from 'zod';
import { apiObject } from '#/core';
import { RestWebhookCredentialsSchema } from './restWebhookCredentials';

export const RestWebhookSchema = apiObject({
  active: z.boolean().optional(),
  configuration: z.record(z.string(), z.any()).optional(),
  credentials: RestWebhookCredentialsSchema.optional(),
  empty: z.boolean().optional(),
  events: z.array(z.string()).optional(),
  name: z.string().optional(),
  scopeType: z.string().optional(),
  sslVerificationRequired: z.boolean().optional(),
  statistics: apiObject({
    empty: z.boolean().optional(),
  }).optional(),
  url: z.string().optional(),
});

export type RestWebhook = z.infer<typeof RestWebhookSchema>;
