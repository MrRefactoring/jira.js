import { z } from 'zod';
import { apiObject } from '#/core';

export const ServiceManagementNavigationInfoSchema = apiObject({
  queueCategory: z.string().optional(),
  queueId: z.number().optional(),
  queueName: z.string().optional(),
});

export type ServiceManagementNavigationInfo = z.infer<typeof ServiceManagementNavigationInfoSchema>;
