import { z } from 'zod';

/** Details of the custom field options for a context. */
export const CustomFieldContextOptionSchema = z.object({
  /** Whether the option is disabled. */
  disabled: z.boolean(),
  /** The ID of the custom field option. */
  id: z.string(),
  /** For cascading options, the ID of the custom field option containing the cascading option. */
  optionId: z.string().optional(),
  /** The value of the custom field option. */
  value: z.string(),
});

export type CustomFieldContextOption = z.infer<typeof CustomFieldContextOptionSchema>;
