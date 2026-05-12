import { z } from 'zod';

export const SimpleApplicationPropertySchema = z.object({
  /** The ID of the application property. */
  id: z.string().optional(),
  /** The new value. */
  value: z.string().optional(),
});

export type SimpleApplicationProperty = z.infer<typeof SimpleApplicationPropertySchema>;
