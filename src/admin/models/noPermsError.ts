import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const NoPermsErrorSchema = apiObject({
  /** Timestamp of the request. */
  timestamp: z.string().optional(),
  /** Path of the request. */
  path: z.string().optional(),
  /** The HTTP status code applicable to this error. */
  status: openEnum(['403']).optional(),
  /** The HTTP status text applicable to this error. */
  error: z.string().optional(),
  /** Human-readable explanation of the error. */
  message: z.string().optional(),
  /** Id of the request. */
  requestId: z.string().optional(),
});

export type NoPermsError = z.infer<typeof NoPermsErrorSchema>;
