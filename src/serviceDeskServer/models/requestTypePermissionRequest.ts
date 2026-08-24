import { z } from 'zod';
import { apiObject } from '#/core';
import { RequestTypePermissionEntityRequestSchema } from './requestTypePermissionEntityRequest';

export const RequestTypePermissionRequestSchema = apiObject({
  allowlist: z.array(RequestTypePermissionEntityRequestSchema).optional(),
});

export type RequestTypePermissionRequest = z.infer<typeof RequestTypePermissionRequestSchema>;
