import { z } from 'zod';
import { apiObject } from '#/core';
import { ExternalReferenceSchema } from './externalReference';

export const ExternalTeamCreationPayloadSchema = apiObject({
  description: z.string().max(360, 'description must be at most 360 characters'),
  externalReference: ExternalReferenceSchema,
  /**
   * [Deprecated] Omitting siteId is deprecated. With the introduction of Units, orgId alone is no longer sufficient to
   * resolve the scope of teams. Always provide a valid siteId to ensure this operation continues to work in the
   * future.
   */
  siteId: z.string().max(255, 'siteId must be at most 255 characters').nullish(),
});

export type ExternalTeamCreationPayload = z.infer<typeof ExternalTeamCreationPayloadSchema>;
