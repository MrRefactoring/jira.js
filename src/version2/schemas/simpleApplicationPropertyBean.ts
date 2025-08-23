import { z } from 'zod';

export const SimpleApplicationPropertyBeanSchema = z.object({
  /** The ID of the application property. */
  id: z.string().optional(),
  /** The new value. */
  value: z.string().optional(),
});

export type SimpleApplicationPropertyBean = z.infer<typeof SimpleApplicationPropertyBeanSchema>;
