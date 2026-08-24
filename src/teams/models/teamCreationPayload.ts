import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const TeamCreationPayloadSchema = apiObject({
  description: z.string().max(360, 'description must be at most 360 characters'),
  displayName: z.string().max(250, 'displayName must be at most 250 characters'),
  /**
   * If the org mandates site-scoped teams, a site ID must be provided or the operation will fail. [Deprecated] Omitting
   * siteId is deprecated. With the introduction of Units, orgId alone is no longer sufficient to resolve the scope of
   * teams. Always provide a valid siteId to ensure this operation continues to work in the future.
   */
  siteId: z.string().max(255, 'siteId must be at most 255 characters').nullish(),
  teamType: openEnum(['OPEN', 'MEMBER_INVITE', 'EXTERNAL', 'ORG_ADMIN_MANAGED']),
});

export type TeamCreationPayload = z.infer<typeof TeamCreationPayloadSchema>;
