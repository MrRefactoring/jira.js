import { z } from 'zod';

export const ProjectTemplateKeySchema = z.object({
  key: z.string().optional(),
  uuid: z.string().optional(),
});

export type ProjectTemplateKey = z.infer<typeof ProjectTemplateKeySchema>;
