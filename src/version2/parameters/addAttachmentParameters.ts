import { z } from 'zod';

export const AddAttachmentParametersSchema = z.object({
  /** The ID or key of the issue that attachments are added to. */
  issueIdOrKey: z.string(),
});

export type AddAttachmentParameters = z.infer<typeof AddAttachmentParametersSchema>;
