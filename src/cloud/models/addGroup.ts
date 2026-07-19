import { z } from 'zod';
import { apiObject } from '#/core';

export const AddGroupSchema = apiObject({
  /** The name of the group. */
  name: z.string(),
});

export type AddGroup = z.infer<typeof AddGroupSchema>;
