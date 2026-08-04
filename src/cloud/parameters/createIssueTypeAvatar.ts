import { z } from 'zod';

export const CreateIssueTypeAvatarSchema = z.object({
  /** The ID of the issue type. */
  id: z.string(),
  /** The X coordinate of the top-left corner of the crop region. */
  x: z.number().optional(),
  /** The Y coordinate of the top-left corner of the crop region. */
  y: z.number().optional(),
  /** The length of each side of the crop region. */
  size: z.number(),
  body: z.record(z.string(), z.any()),
});

export type CreateIssueTypeAvatar = z.input<typeof CreateIssueTypeAvatarSchema>;
