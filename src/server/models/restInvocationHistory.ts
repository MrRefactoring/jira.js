import { z } from 'zod';
import { apiObject } from '#/core';

export const RestInvocationHistorySchema = apiObject({
  empty: z.boolean().optional(),
});

export type RestInvocationHistory = z.infer<typeof RestInvocationHistorySchema>;
