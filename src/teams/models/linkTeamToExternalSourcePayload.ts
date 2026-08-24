import { z } from 'zod';
import { apiObject } from '#/core';
import { ExternalReferenceSchema } from './externalReference';

export const LinkTeamToExternalSourcePayloadSchema = apiObject({
  externalReference: ExternalReferenceSchema,
  /**
   * The siteId to help locate the externalReference. For example, when the externalReference is a group belonging to a
   * site. [Deprecated] Omitting siteId is deprecated. With the introduction of Units, orgId alone is no longer
   * sufficient to resolve the scope of teams. Always provide a valid siteId to ensure this operation continues to work
   * in the future.
   */
  siteId: z.string().max(255, 'siteId must be at most 255 characters').nullish(),
});

export type LinkTeamToExternalSourcePayload = z.infer<typeof LinkTeamToExternalSourcePayloadSchema>;
