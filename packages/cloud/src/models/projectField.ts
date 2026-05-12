import { z } from 'zod';

export const ProjectFieldSchema = z.object({
  description: z.string().optional(),
  fieldId: z.string().optional(),
  isRequired: z.boolean().optional(),
  projectId: z.number().optional(),
  workTypeId: z.number().optional(),
});

export type ProjectField = z.infer<typeof ProjectFieldSchema>;
