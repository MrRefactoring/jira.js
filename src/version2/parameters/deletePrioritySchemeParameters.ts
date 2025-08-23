import { z } from 'zod';

export const DeletePrioritySchemeParametersSchema = z.object({
  /** The priority scheme ID. */
  schemeId: z.number().int(),
});

export type DeletePrioritySchemeParameters = z.infer<typeof DeletePrioritySchemeParametersSchema>;
