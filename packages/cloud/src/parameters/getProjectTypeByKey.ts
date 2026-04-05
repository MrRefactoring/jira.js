import { z } from 'zod';

export const GetProjectTypeByKeySchema = z.object({
  /** The key of the project type. */
  projectTypeKey: z.enum(['software', 'service_desk', 'business', 'product_discovery']),
});

export type GetProjectTypeByKey = z.input<typeof GetProjectTypeByKeySchema>;
