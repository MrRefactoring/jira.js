import { SlaInformationCompletedCycle } from './slaInformationCompletedCycle';
import { SlaInformationOngoingCycle } from './slaInformationOngoingCycle';
import { SelfLink } from './selfLink';

export interface SlaInformation {
  /** ID of the Service Level Agreement (SLA). */
  id?: string;
  /** Description of the SLA. */
  name?: string;
  /** List of completed cycles for the SLA. */
  completedCycles?: SlaInformationCompletedCycle[];
  ongoingCycle?: SlaInformationOngoingCycle;
  Links?: SelfLink;
}
