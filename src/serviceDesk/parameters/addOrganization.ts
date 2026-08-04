import { z } from 'zod';
import { OrganizationServiceDeskUpdateSchema } from '../models';

export const AddOrganizationSchema = z.object({
  /**
   * The ID of the service desk to which the organization will be added. This can alternatively be a [project
   * identifier.](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#project-identifiers)
   */
  serviceDeskId: z.string(),
  body: OrganizationServiceDeskUpdateSchema,
});

export type AddOrganization = z.input<typeof AddOrganizationSchema>;
