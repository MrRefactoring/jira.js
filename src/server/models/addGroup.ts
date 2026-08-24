import { z } from 'zod';
import { apiObject } from '#/core';

export const AddGroupSchema = apiObject({
  name: z.string().optional(),
});

export type AddGroup = z.infer<typeof AddGroupSchema>;
