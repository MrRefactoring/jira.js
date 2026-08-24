import { z } from 'zod';
import { apiObject } from '#/core';

export const DurationSchema = apiObject({
  millis: z.number().optional(),
  friendly: z.string().optional(),
});

export type Duration = z.infer<typeof DurationSchema>;
