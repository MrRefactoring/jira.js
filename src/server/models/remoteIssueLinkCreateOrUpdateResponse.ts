import type { z } from 'zod';
import { apiObject } from '#/core';

export const RemoteIssueLinkCreateOrUpdateResponseSchema = apiObject({});

export type RemoteIssueLinkCreateOrUpdateResponse = z.infer<typeof RemoteIssueLinkCreateOrUpdateResponseSchema>;
