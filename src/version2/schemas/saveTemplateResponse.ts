import { z } from 'zod';
import { ProjectTemplateKeySchema } from './projectTemplateKey';

export const SaveTemplateResponseSchema = z.object({
  projectTemplateKey: ProjectTemplateKeySchema.optional(),
});

export type SaveTemplateResponse = z.infer<typeof SaveTemplateResponseSchema>;
