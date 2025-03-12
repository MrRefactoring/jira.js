import type { ServiceRegistryTier } from './serviceRegistryTier';

export interface ServiceRegistry {
  /** Service description */
  description?: string;
  /** Service ID */
  id?: string;
  /** Service name */
  name?: string;
  /** Organization ID */
  organizationId?: string;
  /** Service revision */
  revision?: string;
  serviceTier?: ServiceRegistryTier;
}
