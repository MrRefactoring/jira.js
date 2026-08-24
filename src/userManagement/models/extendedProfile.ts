import type { z } from 'zod';
import { apiObject } from '#/core';
import { JobTitleSchema } from './jobTitle';
import { OrganizationSchema } from './organization';
import { DepartmentSchema } from './department';
import { LocationSchema } from './location';

export const ExtendedProfileSchema = apiObject({
  job_title: JobTitleSchema.optional(),
  organization: OrganizationSchema.optional(),
  department: DepartmentSchema.optional(),
  location: LocationSchema.optional(),
});

export type ExtendedProfile = z.infer<typeof ExtendedProfileSchema>;
