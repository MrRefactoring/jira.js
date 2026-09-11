import { z } from 'zod';

export const GetComponentSchema = z.object({
  /** A String containing the component key */
  id: z.string(),
});

export type GetComponent = z.input<typeof GetComponentSchema>;
