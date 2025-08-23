import { z } from 'zod';

export const UpdateDefaultScreenSchemeParametersSchema = z.object({
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId: z.string(),
  /** The ID of the screen scheme. */
  screenSchemeId: z.string(),
});

export type UpdateDefaultScreenSchemeParameters = z.infer<typeof UpdateDefaultScreenSchemeParametersSchema>;
