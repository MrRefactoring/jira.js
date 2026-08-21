import type { z } from 'zod';
import { apiObject } from '#/core';
import { RemoteIssueLinkCreateOrUpdateResponseSchema } from './remoteIssueLinkCreateOrUpdateResponse';

export const RemoteReciprocalIssueLinkCreateResponseSchema = apiObject({
  source: RemoteIssueLinkCreateOrUpdateResponseSchema.optional(),
  target: RemoteIssueLinkCreateOrUpdateResponseSchema.optional(),
});

export type RemoteReciprocalIssueLinkCreateResponse = z.infer<typeof RemoteReciprocalIssueLinkCreateResponseSchema>;
