import { z } from 'zod';
import { apiObject } from '#/core';

export const UserColumnRequestBodySchema = apiObject({
  columns: z.array(z.string()).optional(),
});

export type UserColumnRequestBody = z.infer<typeof UserColumnRequestBodySchema>;
