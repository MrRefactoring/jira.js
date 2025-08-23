import { z } from 'zod';

export const RemoveTemplateParametersSchema = z.object({
  /** The {@link String} containing the key of the custom template to remove */
  templateKey: z.string(),
});

export type RemoveTemplateParameters = z.infer<typeof RemoveTemplateParametersSchema>;
