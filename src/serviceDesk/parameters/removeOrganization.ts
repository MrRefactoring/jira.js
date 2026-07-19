import { z } from 'zod';
import { OrganizationServiceDeskUpdateSchema } from '../models';

export const RemoveOrganizationSchema = z.object({
  /**
   * The ID of the service desk from which the organization will be removed. This can alternatively be a [project
   * identifier.](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#project-identifiers)
   */
  serviceDeskId: z.string(),
  body: OrganizationServiceDeskUpdateSchema,
});

export type RemoveOrganization = z.input<typeof RemoveOrganizationSchema>;
