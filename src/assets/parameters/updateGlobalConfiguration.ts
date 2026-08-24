import { z } from 'zod';
import { GlobalConfigurationInSchema } from '../models';

export const UpdateGlobalConfigurationSchema = z.object(GlobalConfigurationInSchema.shape).extend({
  /** Object schema id */
  id: z.string(),
});

export type UpdateGlobalConfiguration = z.input<typeof UpdateGlobalConfigurationSchema>;
