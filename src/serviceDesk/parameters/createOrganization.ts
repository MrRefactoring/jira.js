import { z } from 'zod';
import { OrganizationCreateSchema } from '../models';

export const CreateOrganizationSchema = z.object({}).extend(OrganizationCreateSchema.shape);

export type CreateOrganization = z.input<typeof CreateOrganizationSchema>;
