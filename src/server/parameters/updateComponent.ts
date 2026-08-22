import { z } from 'zod';
import { ComponentSchema } from '../models';

export const UpdateComponentSchema = z.object({
  /** The component to delete. */
  id: z.string(),
  body: ComponentSchema.optional(),
});

export type UpdateComponent = z.input<typeof UpdateComponentSchema>;
