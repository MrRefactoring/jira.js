import { z } from 'zod';
import { apiObject } from '#/core';

export const OrganizationCreateSchema = apiObject({
  /** Name of the organization. Must contain 1-200 characters. */
  name: z.string(),
});

export type OrganizationCreate = z.infer<typeof OrganizationCreateSchema>;
