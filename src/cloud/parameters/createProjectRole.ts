import { z } from 'zod';
import { CreateUpdateRoleRequestSchema } from '../models';

export const CreateProjectRoleSchema = z.object(CreateUpdateRoleRequestSchema.shape);

export type CreateProjectRole = z.input<typeof CreateProjectRoleSchema>;
