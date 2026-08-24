import { z } from 'zod';
import { apiObject } from '#/core';

export const OptionStringSchema = apiObject({
  defined: z.boolean().optional(),
  empty: z.boolean().optional(),
  orNull: z.string().optional(),
});

export type OptionString = z.infer<typeof OptionStringSchema>;
