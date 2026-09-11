import type { z } from 'zod';
import { apiObject } from '#/core';
import { RemoteIssueLinkCreateOrUpdateRequestSchema } from './remoteIssueLinkCreateOrUpdateRequest';

export const RemoteReciprocalIssueLinkCreateRequestSchema = apiObject({
  source: RemoteIssueLinkCreateOrUpdateRequestSchema.optional(),
  target: RemoteIssueLinkCreateOrUpdateRequestSchema.optional(),
});

export type RemoteReciprocalIssueLinkCreateRequest = z.infer<typeof RemoteReciprocalIssueLinkCreateRequestSchema>;
