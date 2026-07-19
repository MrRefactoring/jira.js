import { z } from 'zod';

export const DeleteUiModificationSchema = z.object({
  /** The ID of the UI modification. */
  uiModificationId: z.string(),
});

export type DeleteUiModification = z.input<typeof DeleteUiModificationSchema>;
