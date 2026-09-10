import { z } from 'zod';
import { apiObject } from '#/core';

export const EventMessageModelSchema = apiObject({
  /** Encrypted message of audit log activity */
  content: z.string().optional(),
  /** Format of the audit log message */
  format: z.string().optional(),
});

export type EventMessageModel = z.infer<typeof EventMessageModelSchema>;
