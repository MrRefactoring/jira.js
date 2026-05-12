import { z } from 'zod';

export const ServiceRegistryTierSchema = z.object({
  /** Tier description */
  description: z.string().nullable().optional(),
  /** Tier ID */
  id: z.string().optional(),
  /** Tier level */
  level: z.number().optional(),
  /** Tier name */
  name: z.string().nullable().optional(),
  /** Name key of the tier */
  nameKey: z.string().optional(),
});

export type ServiceRegistryTier = z.infer<typeof ServiceRegistryTierSchema>;
