import { z } from 'zod';

/** A metric that provides insight into the active licence details */
export const LicenseMetricSchema = z.object({
  /** The key of a specific license metric. */
  key: z.string().optional(),
  /**
   * The calculated value of a licence metric linked to the key. An example licence metric is the approximate number of
   * user accounts.
   */
  value: z.string().optional(),
});

export type LicenseMetric = z.infer<typeof LicenseMetricSchema>;
