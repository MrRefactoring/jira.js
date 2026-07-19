import { z } from 'zod';
import { apiObject } from '#/core';

export const GetForgeAppPropertySchema = apiObject({
  key: z.string().optional(),
  value: z.unknown().optional(),
});

export type GetForgeAppProperty = z.infer<typeof GetForgeAppPropertySchema>;
