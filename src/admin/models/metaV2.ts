import { z } from 'zod';
import { apiObject } from '#/core';

export const MetaV2Schema = apiObject({
  pageSize: z.number().optional(),
  startIndex: z.number().nullish(),
  endIndex: z.number().nullish(),
  total: z.number().optional(),
});

export type MetaV2 = z.infer<typeof MetaV2Schema>;
