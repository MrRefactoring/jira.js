import { z } from 'zod';
import { OrganizationServiceDeskUpdateSchema } from '../models';

export const AddOrganizationSchema = z.object(OrganizationServiceDeskUpdateSchema.shape).extend({
  /** The ID of the service desk. */
  serviceDeskId: z.string(),
});

export type AddOrganization = z.input<typeof AddOrganizationSchema>;
