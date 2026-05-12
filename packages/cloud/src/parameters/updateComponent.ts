import { z } from 'zod';
import { ProjectComponentSchema } from '../models';

export const UpdateComponentSchema = z
  .object({
    /** The ID of the component. */
    id: z.string(),
  })
  .extend(ProjectComponentSchema.shape);

export type UpdateComponent = z.input<typeof UpdateComponentSchema>;
