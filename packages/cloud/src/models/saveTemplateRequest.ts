import { z } from 'zod';
import { SaveProjectTemplateRequestSchema } from '#/models/saveProjectTemplateRequest';

/** Request to save a custom template */
export const SaveTemplateRequestSchema = z.object({
  /** The description of the template */
  templateDescription: z.string().max(150, 'templateDescription must be at most 150 characters').optional(),
  templateFromProjectRequest: SaveProjectTemplateRequestSchema.optional(),
  /** The name of the template */
  templateName: z.string().max(50, 'templateName must be at most 50 characters').optional(),
});

export type SaveTemplateRequest = z.infer<typeof SaveTemplateRequestSchema>;
