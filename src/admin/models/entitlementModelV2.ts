import { z } from 'zod';
import { apiObject } from '#/core';

export const EntitlementModelV2Schema = apiObject({
  id: z.string().optional(),
  type: z.string().optional(),
  attributes: apiObject({
    key: z.string().optional(),
    planKey: z.string().nullish(),
    plan: z.string().nullish(),
    billingSourceSystem: z.string().optional(),
    ccpEntitlementId: z.string().optional(),
    ccpTransactionAccountId: z.string().optional(),
    productId: z.string().optional(),
    softCapacityLimit: z.number().optional(),
    usageIdentifier: z.string().optional(),
  }).optional(),
  links: apiObject({
    self: z.string().optional(),
  }).optional(),
});

export type EntitlementModelV2 = z.infer<typeof EntitlementModelV2Schema>;
