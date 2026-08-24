import { z } from 'zod';
import { apiObject } from '#/core';

export const ProgressOutSchema = apiObject({
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
  resultData: z.record(z.string(), z.any()).optional(),
  resultMessage: z.string().optional(),
  actor: z.string().optional(),
  startDate: z.coerce.date().optional(),
  finishedDate: z.coerce.date().optional(),
  estimatedFinishDate: z.coerce.date().optional(),
});

export type ProgressOut = z.infer<typeof ProgressOutSchema>;
