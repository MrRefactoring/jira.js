import type { DashboardGadget } from './dashboardGadget.js';

/** The list of gadgets on the dashboard. */
export interface DashboardGadgetResponse {
  /** The list of gadgets. */
  gadgets: DashboardGadget[];
}
