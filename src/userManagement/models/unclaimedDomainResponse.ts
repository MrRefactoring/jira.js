import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const UnclaimedDomainResponseSchema = apiObject({
  key: openEnum(['forbidden.unclaimedDomain']),
  context: apiObject({
    domain: z.string(),
  }).optional(),
});

export type UnclaimedDomainResponse = z.infer<typeof UnclaimedDomainResponseSchema>;
