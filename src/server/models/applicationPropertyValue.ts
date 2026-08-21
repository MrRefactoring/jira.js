import { z } from 'zod';
import { apiObject } from '#/core';

export const ApplicationPropertyValueSchema = apiObject({
  id: z.string().optional(),
  value: z.string().optional(),
});

export type ApplicationPropertyValue = z.infer<typeof ApplicationPropertyValueSchema>;
