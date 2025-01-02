import { SelfLink } from './selfLink.mjs';
import { SlaInformationCompletedCycle } from './slaInformationCompletedCycle.mjs';
import { SlaInformationOngoingCycle } from './slaInformationOngoingCycle.mjs';

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
