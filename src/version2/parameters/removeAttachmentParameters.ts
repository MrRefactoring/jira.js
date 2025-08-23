import { z } from 'zod';

export const RemoveAttachmentParametersSchema = z.object({
  /** The ID of the attachment. */
  id: z.string(),
});

export type RemoveAttachmentParameters = z.infer<typeof RemoveAttachmentParametersSchema>;
