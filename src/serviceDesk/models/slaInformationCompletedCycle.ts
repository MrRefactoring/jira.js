import type { Date } from './date.js';
import type { Duration } from './duration.js';

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
