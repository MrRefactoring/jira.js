import { z } from 'zod';
import { apiObject } from '#/core';

export const FeatureModelV2Schema = apiObject({
  id: z.string().optional(),
  type: z.string().optional(),
  attributes: apiObject({
    fields: z.record(z.string(), z.any()).optional(),
    allInclusive: z.boolean().optional(),
    available: z.boolean().optional(),
    enabled: z.boolean().optional(),
    entitledSandbox: z.string().optional(),
    events: z.array(z.string()).optional(),
    ip: z.number().optional(),
    isDataResidencyAllowed: z.boolean().optional(),
    isEnabled: z.boolean().optional(),
    isEntitled: z.boolean().optional(),
    limit: z.number().optional(),
    parent: apiObject({
      limit: z.number().optional(),
    }).optional(),
    portal: apiObject({
      limit: z.number().optional(),
    }).optional(),
    realms: z.array(z.string()).optional(),
    self: apiObject({
      limit: z.number().optional(),
    }).optional(),
    tracks: z.array(z.string()).optional(),
    type: z.string().optional(),
    userAccessManagementState: z.string().optional(),
    workspaceActive: z.boolean().optional(),
  }).optional(),
  links: apiObject({
    self: z.string().optional(),
  }).optional(),
});

export type FeatureModelV2 = z.infer<typeof FeatureModelV2Schema>;
