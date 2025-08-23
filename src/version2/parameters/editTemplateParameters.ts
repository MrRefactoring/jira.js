import { z } from 'zod';
import { CustomTemplateOptionsSchema } from './customTemplateOptions';

export const EditTemplateParametersSchema = z.object({
  /** The description of the template */
  templateDescription: z.string().optional(),
  templateGenerationOptions: CustomTemplateOptionsSchema.optional(),
  /** The unique identifier of the template */
  templateKey: z.string().optional(),
  /** The name of the template */
  templateName: z.string().optional(),
});

export type EditTemplateParameters = z.infer<typeof EditTemplateParametersSchema>;
