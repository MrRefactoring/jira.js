import { z } from 'zod';
import { apiObject } from '#/core';
/** Used for long running processes in Assets */

export const ProgressSchema = apiObject({
  progressInPercent: z.number().optional(),
  resourceId: z.string().optional(),
  category: z.string().optional(),
  status: z.string().optional(),
  stepDescription: z.string().optional(),
  currentStep: z.number().optional(),
  numberOfSteps: z.number().optional(),
  currentWorkUnits: z.number().optional(),
  currentWorkDescription: z.string().optional(),
  currentStepTotalWorkUnits: z.number().optional(),
  totalWorkUnits: z.number().optional(),
  result: z.string().optional(),
  /** The result data is different depending on the type of process the category specifies */
  resultData: z.record(z.string(), z.any()).optional(),
  resultMessage: z.string().optional(),
  /** The user key of the user that is running the process */
  actor: z.string().optional(),
  startDate: z.coerce.date().optional(),
  finishedDate: z.coerce.date().optional(),
  /** If it is possible to estimate the comletion of the task this field will be populated */
  estimatedFinishDate: z.coerce.date().optional(),
  /** Unique identifier of the execution */
  executionUUID: z.string().optional(),
});

export type Progress = z.infer<typeof ProgressSchema>;
