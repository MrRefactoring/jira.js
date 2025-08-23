import { z } from 'zod';
import { ServiceRegistryTierSchema } from './serviceRegistryTier';

export const ServiceRegistrySchema = z.object({
  /** Service description */
  description: z.string().optional(),
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
