import { z } from 'zod';

export const DeleteFilterParametersSchema = z.object({
  /** The ID of the filter to delete. */
  id: z.number().int(),
});

export type DeleteFilterParameters = z.infer<typeof DeleteFilterParametersSchema>;
