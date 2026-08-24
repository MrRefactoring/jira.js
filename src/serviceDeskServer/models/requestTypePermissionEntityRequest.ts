import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const RequestTypePermissionEntityRequestSchema = apiObject({
  entityType: openEnum(['USER', 'GROUP', 'ORGANIZATION']).optional(),
  entityId: z.string().optional(),
});

export type RequestTypePermissionEntityRequest = z.infer<typeof RequestTypePermissionEntityRequestSchema>;
