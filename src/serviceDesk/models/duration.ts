import { z } from 'zod';
import { apiObject } from '#/core';

export const DurationSchema = apiObject({
  /** Duration in a user-friendly text format. */
  friendly: z.string().optional(),
  /** Duration in milliseconds. */
  millis: z.number().optional(),
});

export type Duration = z.infer<typeof DurationSchema>;
