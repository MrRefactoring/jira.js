import { z } from 'zod';
import { apiObject } from '#/core';

export const DashboardSchema = apiObject({
  id: z.string().optional(),
  name: z.string().optional(),
  self: z.string().optional(),
  view: z.string().optional(),
});

export type Dashboard = z.infer<typeof DashboardSchema>;
