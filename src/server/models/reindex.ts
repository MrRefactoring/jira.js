import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const ReindexSchema = apiObject({
  currentProgress: z.number().optional(),
  currentSubTask: z.string().optional(),
  finishTime: z.coerce.date().optional(),
  progressUrl: z.string().optional(),
  startTime: z.coerce.date().optional(),
  submittedTime: z.coerce.date().optional(),
  success: z.boolean().optional(),
  type: openEnum(['FOREGROUND', 'BACKGROUND', 'BACKGROUND_PREFFERED', 'BACKGROUND_PREFERRED']).optional(),
});

export type Reindex = z.infer<typeof ReindexSchema>;
