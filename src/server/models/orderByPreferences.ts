import { z } from 'zod';
import { apiObject } from '#/core';

export const OrderByPreferencesSchema = apiObject({
  orderByOption: z.string().optional(),
  projectId: z.number().optional(),
});

export type OrderByPreferences = z.infer<typeof OrderByPreferencesSchema>;
