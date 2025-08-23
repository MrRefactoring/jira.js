import { z } from 'zod';

/** Details of a custom field context. */
export const CustomFieldContextUpdateDetailsSchema = z.object({
  /** The description of the custom field context. The maximum length is 255 characters. */
  description: z.string().optional(),
  /** The name of the custom field context. The name must be unique. The maximum length is 255 characters. */
  name: z.string().optional(),
});

export type CustomFieldContextUpdateDetails = z.infer<typeof CustomFieldContextUpdateDetailsSchema>;
