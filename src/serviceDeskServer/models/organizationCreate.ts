import { z } from 'zod';
import { apiObject } from '#/core';

export const OrganizationCreateSchema = apiObject({
  name: z.string().optional(),
});

export type OrganizationCreate = z.infer<typeof OrganizationCreateSchema>;
