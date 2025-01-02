import { Date } from './date.mjs';
import { Duration } from './duration.mjs';

export interface SlaInformationCompletedCycle {
  startTime?: Date;
  stopTime?: Date;
  breachTime?: Date;
  /** Indicates if the SLA (duration) was exceeded (true) or not (false). */
  breached?: boolean;
  goalDuration?: Duration;
  elapsedTime?: Duration;
  remainingTime?: Duration;
}
