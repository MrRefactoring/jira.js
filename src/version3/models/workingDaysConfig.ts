import type { NonWorkingDay } from './nonWorkingDay';

/** Working days configuration */
export interface WorkingDaysConfig {
  friday?: boolean;
  id?: number;
  monday?: boolean;
  nonWorkingDays?: NonWorkingDay[];
  saturday?: boolean;
  sunday?: boolean;
  thursday?: boolean;
  timezoneId?: string;
  tuesday?: boolean;
  wednesday?: boolean;
}
