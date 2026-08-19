import { z } from 'zod';
import { UpdateDefaultScreenSchemeSchema as UpdateDefaultScreenSchemeModelSchema } from '../models';

export const UpdateDefaultScreenSchemeSchema = z.object(UpdateDefaultScreenSchemeModelSchema.shape).extend({
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId: z.string(),
});

export type UpdateDefaultScreenScheme = z.input<typeof UpdateDefaultScreenSchemeSchema>;
