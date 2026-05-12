import { z } from 'zod';

/** Details of a custom field option to create. */
export const CustomFieldOptionCreateSchema = z.object({
  /** Whether the option is disabled. */
  disabled: z.boolean().optional(),
  /** For cascading options, the ID of a parent option. */
  optionId: z.string().optional(),
  /** The value of the custom field option. */
  value: z.string(),
});

export type CustomFieldOptionCreate = z.infer<typeof CustomFieldOptionCreateSchema>;
