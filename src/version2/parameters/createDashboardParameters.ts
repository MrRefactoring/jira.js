import { z } from 'zod';
import { SharePermissionSchema } from './sharePermission';

export const CreateDashboardParametersSchema = z.object({
  /**
   * Whether admin level permissions are used. It should only be true if the user has _Administer Jira_ [global
   * permission](https://confluence.atlassian.com/x/x4dKLg)
   */
  extendAdminPermissions: z.boolean().optional(),
  /** The description of the dashboard. */
  description: z.string().optional(),
  /** The edit permissions for the dashboard. */
  editPermissions: z.array(SharePermissionSchema),
  /** The name of the dashboard. */
  name: z.string(),
  /** The share permissions for the dashboard. */
  sharePermissions: z.array(SharePermissionSchema),
});

export type CreateDashboardParameters = z.infer<typeof CreateDashboardParametersSchema>;
