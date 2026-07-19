import { z } from 'zod';
import { apiObject } from '#/core';

export const CustomerRequestActionSchema = apiObject({
  /** Indicates whether the user can undertake the action (true) or not (false). */
  allowed: z.boolean().optional(),
});

export type CustomerRequestAction = z.infer<typeof CustomerRequestActionSchema>;
