import { z } from 'zod';
import { apiObject } from '#/core';

export const DateSchema = apiObject({
  iso8601: z.string().optional(),
  jira: z.string().optional(),
  friendly: z.string().optional(),
  epochMillis: z.number().optional(),
});

export type Date = z.infer<typeof DateSchema>;
