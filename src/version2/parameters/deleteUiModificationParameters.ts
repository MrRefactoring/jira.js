import { z } from 'zod';

export const DeleteUiModificationParametersSchema = z.object({
  /** The ID of the UI modification. */
  uiModificationId: z.string(),
});

export type DeleteUiModificationParameters = z.infer<typeof DeleteUiModificationParametersSchema>;
