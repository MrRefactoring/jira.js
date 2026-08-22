import { z } from 'zod';
import { apiObject } from '#/core';
import { ProjectPickerItemSchema } from './projectPickerItem';

export const ProjectPickerResultWrapperSchema = apiObject({
  header: z.string().optional(),
  projects: z.array(ProjectPickerItemSchema).optional(),
  total: z.number().optional(),
});

export type ProjectPickerResultWrapper = z.infer<typeof ProjectPickerResultWrapperSchema>;
