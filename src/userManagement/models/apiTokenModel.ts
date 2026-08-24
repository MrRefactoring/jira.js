import { z } from 'zod';
import { apiObject } from '#/core';
/** API Token information */

export const ApiTokenModelSchema = apiObject({
  /** Human readable description for the token. */
  label: z.string(),
  /** Timestamp last time the token was used to Authenticate as a UTC-ISO8601 string */
  lastAccess: z.string().optional(),
  /** Timestamp of when the token was generated as a UTC-ISO8601 string */
  createdAt: z.string(),
  /** Container token id. This is the identifier of the system user associated with the container token. */
  id: z.string(),
  /** Timestamp of the token expiry as a UTC-ISO8601 string */
  expiry: z.string().optional(),
});

export type ApiTokenModel = z.infer<typeof ApiTokenModelSchema>;
