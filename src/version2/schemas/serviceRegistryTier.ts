import { z } from 'zod';

export const ServiceRegistryTierSchema = z.object({
  /** Tier description */
  description: z.string().optional(),
  /** Tier ID */
  id: z.string().optional(),
  /** Tier level */
  level: z.number().int().optional(),
  /** Tier name */
  name: z.string().optional(),
  /** Name key of the tier */
  nameKey: z.string().optional(),
});

export type ServiceRegistryTier = z.infer<typeof ServiceRegistryTierSchema>;
