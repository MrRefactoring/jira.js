import { z } from 'zod';
import { UpdateDefaultScreenSchemeSchema as UpdateDefaultScreenSchemeModelSchema } from '../models';

export const UpdateDefaultScreenSchemeSchema = z.object({}).extend(UpdateDefaultScreenSchemeModelSchema.shape).extend({
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId: z.string(),
});

export type UpdateDefaultScreenScheme = z.input<typeof UpdateDefaultScreenSchemeSchema>;
