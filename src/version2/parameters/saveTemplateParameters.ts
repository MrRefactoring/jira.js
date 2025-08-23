import { z } from 'zod';
import { SaveProjectTemplateRequestSchema } from './saveProjectTemplateRequest';

export const SaveTemplateParametersSchema = z.object({
  /** The description of the template */
  templateDescription: z.string().optional(),
  templateFromProjectRequest: SaveProjectTemplateRequestSchema.optional(),
  /** The name of the template */
  templateName: z.string().optional(),
});

export type SaveTemplateParameters = z.infer<typeof SaveTemplateParametersSchema>;
