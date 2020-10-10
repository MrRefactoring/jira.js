import { SharePermission } from './sharePermission';

export interface DashboardDetails {
  name: string;
  description?: string;
  sharePermissions: SharePermission[];
}
