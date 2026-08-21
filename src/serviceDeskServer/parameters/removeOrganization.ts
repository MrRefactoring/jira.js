import { z } from 'zod';
import { OrganizationServiceDeskUpdateSchema } from '../models';

export const RemoveOrganizationSchema = z.object(OrganizationServiceDeskUpdateSchema.shape).extend({
  /** The ID of the service desk. */
  serviceDeskId: z.string(),
});

export type RemoveOrganization = z.input<typeof RemoveOrganizationSchema>;
