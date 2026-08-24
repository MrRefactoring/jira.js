import { z } from 'zod';
import { apiObject } from '#/core';

export const ChangeItemSchema = apiObject({
  field: z.string().optional(),
  fieldtype: z.string().optional(),
  from: z.string().optional(),
  fromString: z.string().optional(),
  to: z.string().optional(),
  toString: z.string().optional(),
});

export type ChangeItem = z.infer<typeof ChangeItemSchema>;
