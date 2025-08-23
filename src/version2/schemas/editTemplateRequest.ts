import { z } from 'zod';
import { CustomTemplateOptionsSchema } from './customTemplateOptions';

/** Request to edit a custom template */
export const EditTemplateRequestSchema = z.object({
  /** The description of the template */
  templateDescription: z.string().optional(),
  templateGenerationOptions: CustomTemplateOptionsSchema.optional(),
  /** The unique identifier of the template */
  templateKey: z.string().optional(),
  /** The name of the template */
  templateName: z.string().optional(),
});

export type EditTemplateRequest = z.infer<typeof EditTemplateRequestSchema>;
