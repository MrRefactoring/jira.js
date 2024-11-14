import type { AvailableDashboardGadget } from './availableDashboardGadget.js';

/** The list of available gadgets. */
export interface AvailableDashboardGadgetsResponse {
  /** The list of available gadgets. */
  gadgets: AvailableDashboardGadget[];
}
