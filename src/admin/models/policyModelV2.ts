import { z } from 'zod';
import { apiObject } from '#/core';

export const PolicyModelV2Schema = apiObject({
  id: z.string().optional(),
  type: z.string().optional(),
  attributes: apiObject({
    fields: z.record(z.string(), z.any()).optional(),
    availableTargets: z.number().optional(),
    enabled: z.boolean().optional(),
    parent: apiObject({
      availableForCustomDomain: z.boolean().optional(),
    }).optional(),
    portal: apiObject({
      availableForCustomDomain: z.boolean().optional(),
    }).optional(),
    suspended: z.string().optional(),
    type: z.string().optional(),
  }).optional(),
  links: apiObject({
    self: z.string().optional(),
  }).optional(),
});

export type PolicyModelV2 = z.infer<typeof PolicyModelV2Schema>;
