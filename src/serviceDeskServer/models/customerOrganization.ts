import { z } from 'zod';
import { apiObject } from '#/core';

export const CustomerOrganizationSchema = apiObject({
  name: z.string().optional(),
  id: z.number().optional(),
});

export type CustomerOrganization = z.infer<typeof CustomerOrganizationSchema>;
