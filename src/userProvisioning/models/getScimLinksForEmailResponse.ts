import { z } from 'zod';
import { apiObject } from '#/core';
import { ScimUserLinkSchema } from './scimUserLink';
/** Response containing SCIM user links for an email address. */

export const GetScimLinksForEmailResponseSchema = apiObject({
  /** List of SCIM user links associated with the email address. */
  scimLinks: z.array(ScimUserLinkSchema).optional(),
});

export type GetScimLinksForEmailResponse = z.infer<typeof GetScimLinksForEmailResponseSchema>;
