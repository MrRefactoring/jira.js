import { z } from 'zod';

export const GetAccessibleProjectTypeByKeyParametersSchema = z.object({
  /** The key of the project type. */
  projectTypeKey: z.enum(['software', 'service_desk', 'business', 'product_discovery']),
});

export type GetAccessibleProjectTypeByKeyParameters = z.infer<typeof GetAccessibleProjectTypeByKeyParametersSchema>;
