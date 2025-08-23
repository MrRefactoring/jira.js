import { z } from 'zod';

export const LiveTemplateParametersSchema = z.object({
  /** Optional - The {@link String} containing the project key linked to the custom template to retrieve */
  projectId: z.string().optional(),
  /** Optional - The {@link String} containing the key of the custom template to retrieve */
  templateKey: z.string().optional(),
});

export type LiveTemplateParameters = z.infer<typeof LiveTemplateParametersSchema>;
