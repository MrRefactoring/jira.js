import { z } from 'zod';
import { apiObject } from '#/core';

export const RegisterItemHolderSchema = apiObject({
  isLocked: z.boolean().optional(),
  isManaged: z.boolean().optional(),
});

export type RegisterItemHolder = z.infer<typeof RegisterItemHolderSchema>;
