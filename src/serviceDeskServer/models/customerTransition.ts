import { z } from 'zod';
import { apiObject } from '#/core';

export const CustomerTransitionSchema = apiObject({
  id: z.string().optional(),
  name: z.string().optional(),
});

export type CustomerTransition = z.infer<typeof CustomerTransitionSchema>;
