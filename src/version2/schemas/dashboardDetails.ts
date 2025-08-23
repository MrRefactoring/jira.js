import { z } from 'zod';
import { SharePermissionSchema } from './sharePermission';

/** Details of a dashboard. */
export const DashboardDetailsSchema = z.object({
  /** The description of the dashboard. */
  description: z.string().optional(),
  /** The edit permissions for the dashboard. */
  editPermissions: z.array(SharePermissionSchema),
  /** The name of the dashboard. */
  name: z.string(),
  /** The share permissions for the dashboard. */
  sharePermissions: z.array(SharePermissionSchema),
});

export type DashboardDetails = z.infer<typeof DashboardDetailsSchema>;
