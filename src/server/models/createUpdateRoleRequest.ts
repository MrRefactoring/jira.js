import { z } from 'zod';
import { apiObject } from '#/core';

export const CreateUpdateRoleRequestSchema = apiObject({
  description: z.string().optional(),
  name: z.string().optional(),
});

export type CreateUpdateRoleRequest = z.infer<typeof CreateUpdateRoleRequestSchema>;
