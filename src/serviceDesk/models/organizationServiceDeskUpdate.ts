import { z } from 'zod';
import { apiObject } from '#/core';

export const OrganizationServiceDeskUpdateSchema = apiObject({
  /** List of organizations, specified by 'ID' field values, to add to or remove from the service desk. */
  organizationId: z.number(),
  /** Service desk Id for which, organization needs to be updated */
  serviceDeskId: z.string().optional(),
});

export type OrganizationServiceDeskUpdate = z.infer<typeof OrganizationServiceDeskUpdateSchema>;
