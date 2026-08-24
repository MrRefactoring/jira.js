import { z } from 'zod';
import { apiObject } from '#/core';

export const OrganizationServiceDeskUpdateSchema = apiObject({
  organizationId: z.number().optional(),
});

export type OrganizationServiceDeskUpdate = z.infer<typeof OrganizationServiceDeskUpdateSchema>;
