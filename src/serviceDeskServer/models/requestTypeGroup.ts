import { z } from 'zod';
import { apiObject } from '#/core';

export const RequestTypeGroupSchema = apiObject({
  id: z.string().optional(),
  name: z.string().optional(),
});

export type RequestTypeGroup = z.infer<typeof RequestTypeGroupSchema>;
