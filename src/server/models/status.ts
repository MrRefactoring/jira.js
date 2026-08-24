import { z } from 'zod';
import { apiObject } from '#/core';
import { IconSchema } from './icon';

export const StatusSchema = apiObject({
  icon: IconSchema.optional(),
  resolved: z.boolean().optional(),
});

export type Status = z.infer<typeof StatusSchema>;
