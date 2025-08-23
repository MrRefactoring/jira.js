import { z } from 'zod';

export const ExpandAttachmentForMachinesParametersSchema = z.object({
  /** The ID of the attachment. */
  id: z.string(),
});

export type ExpandAttachmentForMachinesParameters = z.infer<typeof ExpandAttachmentForMachinesParametersSchema>;
