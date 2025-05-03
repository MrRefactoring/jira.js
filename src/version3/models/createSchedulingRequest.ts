import type { CreateDateFieldRequest } from './createDateFieldRequest';

export interface CreateSchedulingRequest {
  /** The dependencies for the plan. This must be "Sequential" or "Concurrent". */
  dependencies?: 'Sequential' | 'Concurrent' | string;
  endDate?: CreateDateFieldRequest;
  /** The estimation unit for the plan. This must be "StoryPoints", "Days" or "Hours". */
  estimation: 'StoryPoints' | 'Days' | 'Hours' | string;
  /** The inferred dates for the plan. This must be "None", "SprintDates" or "ReleaseDates". */
  inferredDates?: 'None' | 'SprintDates' | 'ReleaseDates' | string;
  startDate?: CreateDateFieldRequest;
}
