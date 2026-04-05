import { z } from 'zod';
import { UpdateDefaultScreenSchemeSchema as UpdateDefaultScreenSchemeModelSchema } from '../models';

export const UpdateDefaultScreenSchemeSchema = z
  .object({
    /** The ID of the issue type screen scheme. */
    issueTypeScreenSchemeId: z.string(),
  })
  .extend(UpdateDefaultScreenSchemeModelSchema.shape);

export type UpdateDefaultScreenScheme = z.input<typeof UpdateDefaultScreenSchemeSchema>;
