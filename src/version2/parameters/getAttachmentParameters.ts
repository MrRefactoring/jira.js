import { z } from 'zod';

export const GetAttachmentParametersSchema = z.object({
  /** The ID of the attachment. */
  id: z.string(),
});

export type GetAttachmentParameters = z.infer<typeof GetAttachmentParametersSchema>;
