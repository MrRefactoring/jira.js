/** Details about a task. */
export interface TaskProgress {
  /** The description of the task. */
  description?: string;
  /** The execution time of the task, in milliseconds. */
  elapsedRuntime: number;
  /** A timestamp recording when the task was finished. */
  finished?: string;
  /** The ID of the task. */
  id: string;
  /** A timestamp recording when the task progress was last updated. */
  lastUpdate: string;
  /** Information about the progress of the task. */
  message?: string;
  /** The progress of the task, as a percentage complete. */
  progress: number;
  /** The result of the task execution. */
  result?: {};
  /** The URL of the task. */
  self: string;
  /** A timestamp recording when the task was started. */
  started?: string;
  /** The status of the task. */
  status: 'ENQUEUED' | 'RUNNING' | 'COMPLETE' | 'FAILED' | 'CANCEL_REQUESTED' | 'CANCELLED' | 'DEAD' | string;
  /** A timestamp recording when the task was submitted. */
  submitted?: string;
  /** The ID of the user who submitted the task. */
  submittedBy: number;
}
