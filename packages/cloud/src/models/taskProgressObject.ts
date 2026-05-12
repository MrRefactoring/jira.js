import { z } from 'zod';

/** Details about a task. */
export const TaskProgressObjectSchema = z.object({
  /** The description of the task. */
  description: z.string().optional(),
  /** The execution time of the task, in milliseconds. */
  elapsedRuntime: z.number(),
  /** A timestamp recording when the task was finished. */
  finished: z.number().optional(),
  /** The ID of the task. */
  id: z.string(),
  /** A timestamp recording when the task progress was last updated. */
  lastUpdate: z.number(),
  /** Information about the progress of the task. */
  message: z.string().optional(),
  /** The progress of the task, as a percentage complete. */
  progress: z.number(),
  /** The result of the task execution. */
  result: z.unknown().optional(),
  /** The URL of the task. */
  self: z.url(),
  /** A timestamp recording when the task was started. */
  started: z.number().optional(),
  /** The status of the task. */
  status: z.enum(['ENQUEUED', 'RUNNING', 'COMPLETE', 'FAILED', 'CANCEL_REQUESTED', 'CANCELLED', 'DEAD']),
  /** A timestamp recording when the task was submitted. */
  submitted: z.number(),
  /** The ID of the user who submitted the task. */
  submittedBy: z.number(),
});

export type TaskProgressObject = z.infer<typeof TaskProgressObjectSchema>;
