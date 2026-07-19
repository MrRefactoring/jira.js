import { z } from 'zod';
import { apiObject } from '#/core';
import { ServiceRegistryTierSchema } from './serviceRegistryTier';

export const ServiceRegistrySchema = apiObject({
  /** Service description */
  description: z.string().nullish(),
  /** Service ID */
  id: z.string().optional(),
  /** Service name */
  name: z.string().optional(),
  /** Organization ID */
  organizationId: z.string().optional(),
  /** Service revision */
  revision: z.string().optional(),
  serviceTier: ServiceRegistryTierSchema.optional(),
});

export type ServiceRegistry = z.infer<typeof ServiceRegistrySchema>;
