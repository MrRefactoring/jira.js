import { z } from 'zod';
import { SaveProjectTemplateRequestSchema } from './saveProjectTemplateRequest';

/** Request to save a custom template */
export const SaveTemplateRequestSchema = z.object({
  /** The description of the template */
  templateDescription: z.string().optional(),
  templateFromProjectRequest: SaveProjectTemplateRequestSchema.optional(),
  /** The name of the template */
  templateName: z.string().optional(),
});

export type SaveTemplateRequest = z.infer<typeof SaveTemplateRequestSchema>;
