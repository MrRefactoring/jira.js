import { z } from 'zod';

export const DeleteComponentSchema = z.object({
  /**
   * The new component applied to issues whose 'id' component will be deleted. If this value is null, then the 'id'
   * component is simply removed from the related isues.
   */
  moveIssuesTo: z.string().optional(),
  /** The component to delete. */
  id: z.string(),
});

export type DeleteComponent = z.input<typeof DeleteComponentSchema>;
