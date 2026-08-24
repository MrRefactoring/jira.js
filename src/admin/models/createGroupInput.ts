import { z } from 'zod';
import { apiObject } from '#/core';

export const CreateGroupInputSchema = apiObject({
  /** The name of the group. */
  name: z.string(),
  /** The description of the group. */
  description: z.string().optional(),
});

export type CreateGroupInput = z.infer<typeof CreateGroupInputSchema>;
