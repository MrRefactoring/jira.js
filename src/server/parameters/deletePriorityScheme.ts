import { z } from 'zod';

export const DeletePrioritySchemeSchema = z.object({
  /** Id of priority scheme to delete */
  schemeId: z.number(),
});

export type DeletePriorityScheme = z.input<typeof DeletePrioritySchemeSchema>;
