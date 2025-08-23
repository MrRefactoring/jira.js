import { z } from 'zod';

export const ExpandAttachmentForHumansParametersSchema = z.object({
  /** The ID of the attachment. */
  id: z.string(),
});

export type ExpandAttachmentForHumansParameters = z.infer<typeof ExpandAttachmentForHumansParametersSchema>;
