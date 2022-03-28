import { DashboardGadget } from './dashboardGadget';

/** The list of gadgets on the dashboard. */
export interface DashboardGadgetResponse {
  /** The list of gadgets. */
  gadgets: DashboardGadget[];
}
