import { z } from 'zod';
import { apiObject } from '#/core';

export const StackTraceElementSchema = apiObject({
  methodName: z.string().optional(),
  fileName: z.string().optional(),
  lineNumber: z.number().optional(),
  className: z.string().optional(),
  nativeMethod: z.boolean().optional(),
});

export type StackTraceElement = z.infer<typeof StackTraceElementSchema>;
