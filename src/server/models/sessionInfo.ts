import { z } from 'zod';
import { apiObject } from '#/core';

export const SessionInfoSchema = apiObject({
  name: z.string().optional(),
  value: z.string().optional(),
});

export type SessionInfo = z.infer<typeof SessionInfoSchema>;
