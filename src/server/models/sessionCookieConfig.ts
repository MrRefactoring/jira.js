import { z } from 'zod';
import { apiObject } from '#/core';

export const SessionCookieConfigSchema = apiObject({
  attributes: z.record(z.string(), z.any()).optional(),
  comment: z.string().optional(),
  domain: z.string().optional(),
  httpOnly: z.boolean().optional(),
  maxAge: z.number().optional(),
  name: z.string().optional(),
  path: z.string().optional(),
  secure: z.boolean().optional(),
});

export type SessionCookieConfig = z.infer<typeof SessionCookieConfigSchema>;
