import { z } from 'zod';

export const DeleteDefaultSchema = z.object({
  /**
   * When true will create and return a draft when the workflow scheme cannot be edited (e.g. when it is being used by a
   * project).
   */
  updateDraftIfNeeded: z.boolean().optional(),
  /** The id of the scheme. */
  id: z.number(),
});

export type DeleteDefault = z.input<typeof DeleteDefaultSchema>;
