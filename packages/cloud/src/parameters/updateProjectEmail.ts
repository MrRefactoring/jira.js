import { z } from 'zod';
import { ProjectEmailAddressSchema } from '../models';

export const UpdateProjectEmailSchema = z
  .object({
    /** The project ID. */
    projectId: z.number(),
  })
  .extend(ProjectEmailAddressSchema.shape);

export type UpdateProjectEmail = z.input<typeof UpdateProjectEmailSchema>;
