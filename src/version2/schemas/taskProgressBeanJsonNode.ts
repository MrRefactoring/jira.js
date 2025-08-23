import { z } from 'zod';

/** Details about a task. */
export const TaskProgressBeanJsonNodeSchema = z.object({
  /** The description of the task. */
  description: z.string().optional(),
  /** The execution time of the task, in milliseconds. */
  elapsedRuntime: z.number().int(),
  /** A timestamp recording when the task was finished. */
  finished: z.number().int().optional(),
  /** The ID of the task. */
  id: z.string(),
  /** A timestamp recording when the task progress was last updated. */
  lastUpdate: z.number().int(),
  /** Information about the progress of the task. */
  message: z.string().optional(),
  /** The progress of the task, as a percentage complete. */
  progress: z.number().int(),
  /** The result of the task execution. */
  result: z.unknown().optional(),
  /** The URL of the task. */
  self: z.string(),
  /** A timestamp recording when the task was started. */
  started: z.number().int().optional(),
  /** The status of the task. */
  status: z.enum(['ENQUEUED', 'RUNNING', 'COMPLETE', 'FAILED', 'CANCEL_REQUESTED', 'CANCELLED', 'DEAD']),
  /** A timestamp recording when the task was submitted. */
  submitted: z.number().int(),
  /** The ID of the user who submitted the task. */
  submittedBy: z.number().int(),
});

export type TaskProgressBeanJsonNode = z.infer<typeof TaskProgressBeanJsonNodeSchema>;
