import { z } from 'zod';
import { apiObject } from '#/core';

export const CookieSchema = apiObject({
  attributes: z.record(z.string(), z.any()).optional(),
  comment: z.string().optional(),
  domain: z.string().optional(),
  httpOnly: z.boolean().optional(),
  maxAge: z.number().optional(),
  name: z.string().optional(),
  path: z.string().optional(),
  secure: z.boolean().optional(),
  value: z.string().optional(),
  version: z.number().optional(),
});

export type Cookie = z.infer<typeof CookieSchema>;
