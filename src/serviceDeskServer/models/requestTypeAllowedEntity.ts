import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const RequestTypeAllowedEntitySchema = apiObject({
  avatarUrl: z.string().optional(),
  entityId: z.string().optional(),
  entityType: openEnum(['USER', 'GROUP', 'ORGANIZATION']).optional(),
  displayName: z.string().optional(),
  status: openEnum(['DELETED', 'REMOVED', 'ACTIVE']).optional(),
});

export type RequestTypeAllowedEntity = z.infer<typeof RequestTypeAllowedEntitySchema>;
