import { DashboardDetails } from '../models';

export interface CreateDashboard extends Omit<DashboardDetails, 'editPermissions'> {}
