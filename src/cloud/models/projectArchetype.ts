import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const ProjectArchetypeSchema = apiObject({
  realType: openEnum([
    'BUSINESS',
    'SOFTWARE',
    'PRODUCT_DISCOVERY',
    'SERVICE_DESK',
    'CUSTOMER_SERVICE',
    'OPS',
  ]).optional(),
  style: openEnum(['classic', 'next-gen']).optional(),
  type: openEnum(['BUSINESS', 'SOFTWARE', 'PRODUCT_DISCOVERY', 'SERVICE_DESK', 'CUSTOMER_SERVICE', 'OPS']).optional(),
});

export type ProjectArchetype = z.infer<typeof ProjectArchetypeSchema>;
