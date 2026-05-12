import { z } from 'zod';

export const WorkManagementNavigationInfoSchema = z.object({
  boardName: z.string().optional(),
});

export type WorkManagementNavigationInfo = z.infer<typeof WorkManagementNavigationInfoSchema>;
