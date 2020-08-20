import { SharePermission } from './sharePermission';

export interface DashboardRequest {
    description: string;
    name: string;
    sharePermissions: SharePermission[];
}
