import { z } from 'zod';
import { ProjectEmailAddressSchema } from '../models';

export const UpdateProjectEmailSchema = z.object({}).extend(ProjectEmailAddressSchema.shape).extend({
  /** The project ID. */
  projectId: z.number(),
});

export type UpdateProjectEmail = z.input<typeof UpdateProjectEmailSchema>;
