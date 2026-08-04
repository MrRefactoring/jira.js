import { z } from 'zod';
import { apiObject } from '#/core';

export const ProjectArchetypeSchema = apiObject({
  realType: z.enum(['BUSINESS', 'SOFTWARE', 'PRODUCT_DISCOVERY', 'SERVICE_DESK', 'CUSTOMER_SERVICE', 'OPS']).optional(),
  style: z.enum(['classic', 'next-gen']).optional(),
  type: z.enum(['BUSINESS', 'SOFTWARE', 'PRODUCT_DISCOVERY', 'SERVICE_DESK', 'CUSTOMER_SERVICE', 'OPS']).optional(),
});

export type ProjectArchetype = z.infer<typeof ProjectArchetypeSchema>;
