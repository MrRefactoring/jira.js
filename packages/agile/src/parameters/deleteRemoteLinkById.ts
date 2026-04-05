import { z } from 'zod';

export const DeleteRemoteLinkByIdSchema = z.object({
  /** The ID of the Remote Link to fetch. */
  remoteLinkId: z.string().max(255, 'remoteLinkId must be at most 255 characters'),
});

export type DeleteRemoteLinkById = z.input<typeof DeleteRemoteLinkByIdSchema>;
