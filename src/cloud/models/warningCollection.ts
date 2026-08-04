import { z } from 'zod';
import { apiObject } from '#/core';

export const WarningCollectionSchema = apiObject({
  warnings: z.array(z.string()).optional(),
});

export type WarningCollection = z.infer<typeof WarningCollectionSchema>;
