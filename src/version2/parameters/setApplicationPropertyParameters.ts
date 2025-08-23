import { z } from 'zod';

export const SetApplicationPropertyParametersSchema = z.object({
  /** The key of the application property to update. */
  id: z.string(),
  /** The ID of the application property. */
  id: z.string().optional(),
  /** The new value. */
  value: z.string().optional(),
});

export type SetApplicationPropertyParameters = z.infer<typeof SetApplicationPropertyParametersSchema>;
