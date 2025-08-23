import { z } from 'zod';

export const DeleteResolutionParametersSchema = z.object({
  /** The ID of the issue resolution. */
  id: z.string(),
  /** The ID of the issue resolution that will replace the currently selected resolution. */
  replaceWith: z.string(),
});

export type DeleteResolutionParameters = z.infer<typeof DeleteResolutionParametersSchema>;
