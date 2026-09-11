import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const HttpServletMappingSchema = apiObject({
  mappingMatch: openEnum(['CONTEXT_ROOT', 'DEFAULT', 'EXACT', 'EXTENSION', 'PATH']).optional(),
  matchValue: z.string().optional(),
  pattern: z.string().optional(),
  servletName: z.string().optional(),
});

export type HttpServletMapping = z.infer<typeof HttpServletMappingSchema>;
