import type { SelfLink } from './selfLink.js';
import type { SlaInformationCompletedCycle } from './slaInformationCompletedCycle.js';
import type { SlaInformationOngoingCycle } from './slaInformationOngoingCycle.js';

export interface SlaInformation {
  /** ID of the Service Level Agreement (SLA). */
  id?: string;
  /** Description of the SLA. */
  name?: string;
  /** List of completed cycles for the SLA. */
  completedCycles?: SlaInformationCompletedCycle[];
  ongoingCycle?: SlaInformationOngoingCycle;
  /** Format in which SLA is to be displayed in the UI */
  slaDisplayFormat?: string;
  Links?: SelfLink;
}
