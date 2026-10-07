import { z } from 'zod';
import { apiObject } from '#/core';

export const CustomerOrganizationSchema = apiObject({
  name: z.string().optional(),
  id: z.string().optional(),
});

export type CustomerOrganization = z.infer<typeof CustomerOrganizationSchema>;
