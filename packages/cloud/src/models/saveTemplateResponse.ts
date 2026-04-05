import { z } from 'zod';
import { ProjectTemplateKeySchema } from '#/models/projectTemplateKey';

export const SaveTemplateResponseSchema = z.object({
  projectTemplateKey: ProjectTemplateKeySchema.optional(),
});

export type SaveTemplateResponse = z.infer<typeof SaveTemplateResponseSchema>;
