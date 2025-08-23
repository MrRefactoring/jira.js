import { z } from 'zod';

/** Default value for a float (number) custom field. */
export const CustomFieldContextDefaultValueFloatSchema = z.object({
  /** The default floating-point number. */
  number: z.number(),
  type: z.string(),
});

export type CustomFieldContextDefaultValueFloat = z.infer<typeof CustomFieldContextDefaultValueFloatSchema>;
