import { z } from 'zod';
import { apiObject } from '#/core';

export const AppMonitoringRestEntitySchema = apiObject({
  enabled: z.boolean().optional(),
});

export type AppMonitoringRestEntity = z.infer<typeof AppMonitoringRestEntitySchema>;
