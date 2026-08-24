import { z } from 'zod';
import { apiObject } from '#/core';

export const ProxyErrorSchema = apiObject({
  /** The HTTP status code applicable to this error. */
  code: z.number().optional(),
  /** Human-readable explanation of the error. */
  message: z.string().optional(),
});

export type ProxyError = z.infer<typeof ProxyErrorSchema>;
