import { z } from 'zod';
import { apiObject } from '#/core';
import { DashboardSchema } from './dashboard';

export const DashboardsSchema = apiObject({
  dashboards: z.array(DashboardSchema).optional(),
  maxResults: z.number().optional(),
  next: z.string().optional(),
  prev: z.string().optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
});

export type Dashboards = z.infer<typeof DashboardsSchema>;
