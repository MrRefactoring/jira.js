import { z } from 'zod';
import { apiObject } from '#/core';

export const ServletRegistrationSchema = apiObject({
  className: z.string().optional(),
  initParameters: z.record(z.string(), z.string()).optional(),
  mappings: z.array(z.string()).optional(),
  name: z.string().optional(),
  runAsRole: z.string().optional(),
});

export type ServletRegistration = z.infer<typeof ServletRegistrationSchema>;
