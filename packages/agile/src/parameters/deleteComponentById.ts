import { z } from 'zod';

export const DeleteComponentByIdSchema = z.object({
  /** The ID of the Component to delete. */
  componentId: z.string().max(255, 'componentId must be at most 255 characters'),
});

export type DeleteComponentById = z.input<typeof DeleteComponentByIdSchema>;
