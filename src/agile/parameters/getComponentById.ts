import { z } from 'zod';

export const GetComponentByIdSchema = z.object({
  /** The ID of the Component to fetch. */
  componentId: z.string().max(255, 'componentId must be at most 255 characters'),
});

export type GetComponentById = z.input<typeof GetComponentByIdSchema>;
