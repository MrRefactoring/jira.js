import type { DashboardDetails } from '../models/index.js';

export interface UpdateDashboard extends DashboardDetails {
  /** The ID of the dashboard to update. */
  id: string;
}
