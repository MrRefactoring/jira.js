import { z } from 'zod';
import { apiObject } from '#/core';

export const CustomerTransitionSchema = apiObject({
  /** ID of the transition. */
  id: z.string().optional(),
  /** Name of the transition. */
  name: z.string().optional(),
});

export type CustomerTransition = z.infer<typeof CustomerTransitionSchema>;
