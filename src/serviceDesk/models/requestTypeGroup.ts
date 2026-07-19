import { z } from 'zod';
import { apiObject } from '#/core';

export const RequestTypeGroupSchema = apiObject({
  /** ID of the request type group */
  id: z.string().optional(),
  /** Name of the request type group. */
  name: z.string().optional(),
});

export type RequestTypeGroup = z.infer<typeof RequestTypeGroupSchema>;
