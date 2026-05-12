import { z } from 'zod';
import { authSchema } from './auth';

export const clientConfigSchema = z.object({
  host: z.url(),
  auth: authSchema.optional(),
  headers: z.record(z.string(), z.string()).optional(),
  getAuthOn401: z.custom<() => Promise<z.infer<typeof authSchema>>>(val => typeof val === 'function').optional(),
});

export type ClientConfig = z.infer<typeof clientConfigSchema>;
