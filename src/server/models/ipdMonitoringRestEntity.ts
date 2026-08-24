import { z } from 'zod';
import { apiObject } from '#/core';

export const IpdMonitoringRestEntitySchema = apiObject({
  enabled: z.boolean().optional(),
});

export type IpdMonitoringRestEntity = z.infer<typeof IpdMonitoringRestEntitySchema>;
