import { z } from 'zod';
import { apiObject } from '#/core';
import { SecurityLevelJsonSchema } from './securityLevelJson';

export const SecuritySchemeJsonSchema = apiObject({
  defaultSecurityLevelId: z.number().optional(),
  description: z.string().optional(),
  id: z.number().optional(),
  levels: z.array(SecurityLevelJsonSchema).optional(),
  name: z.string().optional(),
  self: z.string().optional(),
});

export type SecuritySchemeJson = z.infer<typeof SecuritySchemeJsonSchema>;
