/** Details about a task. */
export interface TaskProgressBeanObject {
  /** The URL of the task. */
  self: string;
  /** The ID of the task. */
  id: string;
  /** The description of the task. */
  description?: string;
  /** The status of the task. */
  status: string;
  /** Information about the progress of the task. */
  message?: string;
  /** The result of the task execution. */
  result?: any;
  /** The ID of the user who submitted the task. */
  submittedBy: number;
  /** The progress of the task, as a percentage complete. */
  progress: number;
  /** The execution time of the task, in milliseconds. */
  elapsedRuntime: number;
  /** A timestamp recording when the task was submitted. */
  submitted: number;
  /** A timestamp recording when the task was started. */
  started?: number;
  /** A timestamp recording when the task was finished. */
  finished?: number;
  /** A timestamp recording when the task progress was last updated. */
  lastUpdate: number;
}
