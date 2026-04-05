import { z } from 'zod';

export const GetRemoteLinkByIdSchema = z.object({
  /** The ID of the Remote Link to fetch. */
  remoteLinkId: z.string().max(255, 'remoteLinkId must be at most 255 characters'),
});

export type GetRemoteLinkById = z.input<typeof GetRemoteLinkByIdSchema>;
