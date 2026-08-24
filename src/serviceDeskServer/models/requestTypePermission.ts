import { z } from 'zod';
import { apiObject } from '#/core';
import { RequestTypeAllowedEntitySchema } from './requestTypeAllowedEntity';

export const RequestTypePermissionSchema = apiObject({
  id: z.string().optional(),
  permissions: z.array(RequestTypeAllowedEntitySchema).optional(),
});

export type RequestTypePermission = z.infer<typeof RequestTypePermissionSchema>;
