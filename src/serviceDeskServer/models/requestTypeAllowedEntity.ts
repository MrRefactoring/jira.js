import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const RequestTypeAllowedEntitySchema = apiObject({
  entityId: z.string().optional(),
  entityType: openEnum(['USER', 'GROUP', 'ORGANIZATION']).optional(),
  avatarUrl: z.string().optional(),
  displayName: z.string().optional(),
  status: openEnum(['DELETED', 'REMOVED', 'ACTIVE']).optional(),
});

export type RequestTypeAllowedEntity = z.infer<typeof RequestTypeAllowedEntitySchema>;
