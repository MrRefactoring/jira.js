import { z } from 'zod';
import type { AttachmentInput } from '#/core';

export const UploadAndSetTeamCoverPhotoSchema = z.object({
  /** The ID of the team to be updated. */
  teamId: z.string(),
  file: z.custom<AttachmentInput | AttachmentInput[]>(),
});

export type UploadAndSetTeamCoverPhoto = z.input<typeof UploadAndSetTeamCoverPhotoSchema>;
