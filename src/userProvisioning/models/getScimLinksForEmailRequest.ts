import { z } from 'zod';
import { apiObject } from '#/core';
/** Request object to get SCIM links for an email address. */

export const GetScimLinksForEmailRequestSchema = apiObject({
  /** The email address to look up SCIM links for */
  email: z.string(),
});

export type GetScimLinksForEmailRequest = z.infer<typeof GetScimLinksForEmailRequestSchema>;
