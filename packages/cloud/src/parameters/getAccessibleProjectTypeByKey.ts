import { z } from 'zod';

export const GetAccessibleProjectTypeByKeySchema = z.object({
  /** The key of the project type. */
  projectTypeKey: z.enum(['software', 'service_desk', 'business', 'product_discovery']),
});

export type GetAccessibleProjectTypeByKey = z.input<typeof GetAccessibleProjectTypeByKeySchema>;
