import { z } from 'zod';
import { apiObject } from '#/core';
import { ServletContextSchema } from './servletContext';

export const HttpSessionSchema = apiObject({
  attributeNames: z.record(z.string(), z.any()).optional(),
  creationTime: z.number().optional(),
  id: z.string().optional(),
  lastAccessedTime: z.number().optional(),
  maxInactiveInterval: z.number().optional(),
  new: z.boolean().optional(),
  servletContext: ServletContextSchema.optional(),
});

export type HttpSession = z.infer<typeof HttpSessionSchema>;
