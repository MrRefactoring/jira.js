import { z } from 'zod';

/** Details of an application property. */
export const ApplicationPropertySchema = z.object({
  /** The allowed values, if applicable. */
  allowedValues: z.array(z.string()).optional(),
  /** The default value of the application property. */
  defaultValue: z.string().optional(),
  /** The description of the application property. */
  desc: z.string().optional(),
  example: z.string().optional(),
  /** The ID of the application property. The ID and key are the same. */
  id: z.string().optional(),
  /** The key of the application property. The ID and key are the same. */
  key: z.string().optional(),
  /** The name of the application property. */
  name: z.string().optional(),
  /** The data type of the application property. */
  type: z.string().optional(),
  /** The new value. */
  value: z.string().optional(),
});

export type ApplicationProperty = z.infer<typeof ApplicationPropertySchema>;
