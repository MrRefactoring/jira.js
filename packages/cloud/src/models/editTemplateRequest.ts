import { z } from 'zod';
import { CustomTemplateOptionsSchema } from '#/models/customTemplateOptions';

/** Request to edit a custom template */
export const EditTemplateRequestSchema = z.object({
  /** The description of the template */
  templateDescription: z.string().max(150, 'templateDescription must be at most 150 characters').optional(),
  templateGenerationOptions: CustomTemplateOptionsSchema.optional(),
  /** The unique identifier of the template */
  templateKey: z.string().optional(),
  /** The name of the template */
  templateName: z.string().max(50, 'templateName must be at most 50 characters').optional(),
});

export type EditTemplateRequest = z.infer<typeof EditTemplateRequestSchema>;
