import { z } from 'zod';
import { apiObject } from '#/core';

export const FilterRegistrationSchema = apiObject({
  className: z.string().optional(),
  initParameters: z.record(z.string(), z.any()).optional(),
  name: z.string().optional(),
  servletNameMappings: z.array(z.string()).optional(),
  urlPatternMappings: z.array(z.string()).optional(),
});

export type FilterRegistration = z.infer<typeof FilterRegistrationSchema>;
