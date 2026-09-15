import { z } from 'zod';
import { apiObject } from '#/core';
import { StackTraceElementSchema, type StackTraceElement } from './stackTraceElement';

export interface Throwable {
  cause?: Throwable;
  stackTrace?: StackTraceElement[];
  message?: string;
  localizedMessage?: string;
  suppressed?: Throwable[];
  [key: string]: unknown;
}

export interface ThrowableInput {
  cause?: ThrowableInput;
  stackTrace?: z.input<typeof StackTraceElementSchema>[];
  message?: string;
  localizedMessage?: string;
  suppressed?: ThrowableInput[];
}

export const ThrowableSchema: z.ZodType<Throwable, ThrowableInput> = apiObject({
  cause: z.lazy(() => ThrowableSchema).optional(),
  stackTrace: z.array(StackTraceElementSchema).optional(),
  message: z.string().optional(),
  localizedMessage: z.string().optional(),
  suppressed: z.array(z.lazy(() => ThrowableSchema)).optional(),
});
