import { z } from 'zod';

export const UploadEmailTemplatesSchema = z.object({
  body: z.custom<Blob>(),
});

export type UploadEmailTemplates = z.input<typeof UploadEmailTemplatesSchema>;
