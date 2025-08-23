import { z } from 'zod';
import { SharePermissionSchema } from './sharePermission';

/** Details of a dashboard. */
export const DashboardSchema = z.object({
  /** The automatic refresh interval for the dashboard in milliseconds. */
  automaticRefreshMs: z.number().int().optional(),
  description: z.string().optional(),
  /** The details of any edit share permissions for the dashboard. */
  editPermissions: z.array(SharePermissionSchema).optional(),
  /** The ID of the dashboard. */
  id: z.string().optional(),
  /** Whether the dashboard is selected as a favorite by the user. */
  isFavourite: z.boolean().optional(),
  /** Whether the current user has permission to edit the dashboard. */
  isWritable: z.boolean().optional(),
  /** The name of the dashboard. */
  name: z.string().optional(),
  /** The owner of the dashboard. */
  owner: z.unknown().optional(),
  /** The number of users who have this dashboard as a favorite. */
  popularity: z.number().int().optional(),
  /** The rank of this dashboard. */
  rank: z.number().int().optional(),
  /** The URL of these dashboard details. */
  self: z.string().optional(),
  /** The details of any view share permissions for the dashboard. */
  sharePermissions: z.array(SharePermissionSchema).optional(),
  /** Whether the current dashboard is system dashboard. */
  systemDashboard: z.boolean().optional(),
  /** The URL of the dashboard. */
  view: z.string().optional(),
});

export type Dashboard = z.infer<typeof DashboardSchema>;
