import { z } from 'zod';
import { apiObject } from '#/core';
import { ApplicationSchema } from './application';
import { RemoteObjectSchema } from './remoteObject';

export const RemoteIssueLinkCreateOrUpdateRequestSchema = apiObject({
  application: ApplicationSchema.optional(),
  globalId: z.string().optional(),
  object: RemoteObjectSchema.optional(),
  relationship: z.string().optional(),
});

export type RemoteIssueLinkCreateOrUpdateRequest = z.infer<typeof RemoteIssueLinkCreateOrUpdateRequestSchema>;
