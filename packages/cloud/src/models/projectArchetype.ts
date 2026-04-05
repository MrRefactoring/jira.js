import { z } from 'zod';

export const ProjectArchetypeSchema = z.object({
  realType: z.enum(['BUSINESS', 'SOFTWARE', 'PRODUCT_DISCOVERY', 'SERVICE_DESK', 'CUSTOMER_SERVICE', 'OPS']).optional(),
  style: z.enum(['classic', 'next-gen']).optional(),
  type: z.enum(['BUSINESS', 'SOFTWARE', 'PRODUCT_DISCOVERY', 'SERVICE_DESK', 'CUSTOMER_SERVICE', 'OPS']).optional(),
});

export type ProjectArchetype = z.infer<typeof ProjectArchetypeSchema>;
