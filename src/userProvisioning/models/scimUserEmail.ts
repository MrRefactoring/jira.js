import { z } from 'zod';
import { apiObject } from '#/core';
/** SCIM user email */

export const ScimUserEmailSchema = apiObject({
  /** Email address. */
  value: z.string().optional(),
  /** Type of email address, for example "work" or "personal". */
  type: z.string().optional(),
  /** Boolean value indicating whether this is the primary email address. */
  primary: z.boolean().optional(),
});

export type ScimUserEmail = z.infer<typeof ScimUserEmailSchema>;
