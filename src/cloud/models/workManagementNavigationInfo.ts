import { z } from 'zod';
import { apiObject } from '#/core';

export const WorkManagementNavigationInfoSchema = apiObject({
  boardName: z.string().optional(),
});

export type WorkManagementNavigationInfo = z.infer<typeof WorkManagementNavigationInfoSchema>;
