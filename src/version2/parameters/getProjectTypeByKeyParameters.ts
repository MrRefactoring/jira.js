import { z } from 'zod';

export const GetProjectTypeByKeyParametersSchema = z.object({
  /** The key of the project type. */
  projectTypeKey: z.enum(['software', 'service_desk', 'business', 'product_discovery']),
});

export type GetProjectTypeByKeyParameters = z.infer<typeof GetProjectTypeByKeyParametersSchema>;
