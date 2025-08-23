import { z } from 'zod';

export const ServiceManagementNavigationInfoSchema = z.object({
  queueCategory: z.string().optional(),
  queueId: z.number().int().optional(),
  queueName: z.string().optional(),
});

export type ServiceManagementNavigationInfo = z.infer<typeof ServiceManagementNavigationInfoSchema>;
