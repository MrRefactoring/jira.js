import { Date } from './date.mjs';
import { Duration } from './duration.mjs';

export interface SlaInformationOngoingCycle {
  startTime?: Date;
  breachTime?: Date;
  /** Indicates whether the SLA has been breached (true) or not (false). */
  breached?: boolean;
  /** Indicates whether the SLA is paused (true) or not (false). */
  paused?: boolean;
  /** Indicates whether the SLA it timed during calendared working hours only (true) or not (false). */
  withinCalendarHours?: boolean;
  goalDuration?: Duration;
  elapsedTime?: Duration;
  remainingTime?: Duration;
}
