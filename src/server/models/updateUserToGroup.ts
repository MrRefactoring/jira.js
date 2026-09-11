import { z } from 'zod';
import { apiObject } from '#/core';

export const UpdateUserToGroupSchema = apiObject({
  name: z.string().optional(),
});

export type UpdateUserToGroup = z.infer<typeof UpdateUserToGroupSchema>;
