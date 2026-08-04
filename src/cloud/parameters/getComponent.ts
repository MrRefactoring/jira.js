import { z } from 'zod';

export const GetComponentSchema = z.object({
  /** The ID of the component. */
  id: z.string(),
});

export type GetComponent = z.input<typeof GetComponentSchema>;
