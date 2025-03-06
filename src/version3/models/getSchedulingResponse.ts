import type { GetDateFieldResponse } from './getDateFieldResponse';

export interface GetSchedulingResponse {
  /** The dependencies for the plan. This is "Sequential" or "Concurrent". */
  dependencies: 'Sequential' | 'Concurrent' | string;
  endDate?: GetDateFieldResponse;
  /** The estimation unit for the plan. This is "StoryPoints", "Days" or "Hours". */
  estimation: 'StoryPoints' | 'Days' | 'Hours' | string;
  /** The inferred dates for the plan. This is "None", "SprintDates" or "ReleaseDates". */
  inferredDates: 'None' | 'SprintDates' | 'ReleaseDates' | string;
  startDate?: GetDateFieldResponse;
}
