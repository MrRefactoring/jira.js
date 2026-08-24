import { z } from 'zod';
import { apiObject } from '#/core';
import { ScimUserLinkSchema } from './scimUserLink';
/** Response containing SCIM links for an Atlassian account ID */

export const GetScimLinksForAaIdInAnOrgResponseSchema = apiObject({
  /** List of SCIM user links associated with the Atlassian account ID. */
  scimLinks: z.array(ScimUserLinkSchema).optional(),
});

export type GetScimLinksForAaIdInAnOrgResponse = z.infer<typeof GetScimLinksForAaIdInAnOrgResponseSchema>;
