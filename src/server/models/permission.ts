import { z } from 'zod';
import { apiObject } from '#/core';

export const PermissionSchema = apiObject({
  group: z.string().optional(),
  permType: z.string().optional(),
});

export type Permission = z.infer<typeof PermissionSchema>;
