import { z } from 'zod';
import { apiObject } from '#/core';

export const RestWebhookCredentialsSchema = apiObject({
  empty: z.boolean().optional(),
  password: z.string().optional(),
  username: z.string().optional(),
});

export type RestWebhookCredentials = z.infer<typeof RestWebhookCredentialsSchema>;
