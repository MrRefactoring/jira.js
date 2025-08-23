import { z } from 'zod';

export const CreateIssueTypeAvatarParametersSchema = z.object({
  /** The ID of the issue type. */
  id: z.string(),
  /** The X coordinate of the top-left corner of the crop region. */
  x: z.number().int().optional(),
  /** The Y coordinate of the top-left corner of the crop region. */
  y: z.number().int().optional(),
  /** The length of each side of the crop region. */
  size: z.number().int(),
});

export type CreateIssueTypeAvatarParameters = z.infer<typeof CreateIssueTypeAvatarParametersSchema>;
