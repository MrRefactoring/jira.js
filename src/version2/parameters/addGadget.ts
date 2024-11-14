import type { DashboardGadgetSettings } from '../models/index.js';

export interface AddGadget extends DashboardGadgetSettings {
  /** The ID of the dashboard. */
  dashboardId: number;
}
