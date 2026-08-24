import { z } from 'zod';
import { apiObject } from '#/core';

export const ApplicationPropertySchema = apiObject({
  id: z.string().optional(),
  key: z.string().optional(),
  value: z.string().optional(),
  name: z.string().optional(),
  desc: z.string().optional(),
  type: z.string().optional(),
  defaultValue: z.string().optional(),
  example: z.string().optional(),
  allowedValues: z.array(z.string()).optional(),
});

export type ApplicationProperty = z.infer<typeof ApplicationPropertySchema>;
