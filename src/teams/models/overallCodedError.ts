import { z } from 'zod';
import { apiObject } from '#/core';

export const OverallCodedErrorSchema = apiObject({
  code: z.string(),
  message: z.string(),
});

export type OverallCodedError = z.infer<typeof OverallCodedErrorSchema>;
