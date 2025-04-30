/** Time tracking details. */
export interface TimeTrackingDetails {
  /** The original estimate of time needed for this issue in readable format. */
  originalEstimate?: string;
  /** The remaining estimate of time needed for this issue in readable format. */
  remainingEstimate?: string;
  /** Time worked on this issue in readable format. */
  timeSpent?: string;
  /** The original estimate of time needed for this issue in seconds. */
  originalEstimateSeconds?: number;
  /** The remaining estimate of time needed for this issue in seconds. */
  remainingEstimateSeconds?: number;
  /** Time worked on this issue in seconds. */
  timeSpentSeconds?: number;
}
