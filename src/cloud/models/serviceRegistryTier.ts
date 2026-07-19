import { z } from 'zod';
import { apiObject } from '#/core';

export const ServiceRegistryTierSchema = apiObject({
  /** Tier description */
  description: z.string().nullish(),
  /** Tier ID */
  id: z.string().optional(),
  /** Tier level */
  level: z.number().optional(),
  /** Tier name */
  name: z.string().nullish(),
  /** Name key of the tier */
  nameKey: z.string().optional(),
});

export type ServiceRegistryTier = z.infer<typeof ServiceRegistryTierSchema>;
