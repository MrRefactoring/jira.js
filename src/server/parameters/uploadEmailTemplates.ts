import { z } from 'zod';

export const UploadEmailTemplatesSchema = z.object({
  body: z.record(z.string(), z.any()).optional(),
});

export type UploadEmailTemplates = z.input<typeof UploadEmailTemplatesSchema>;
