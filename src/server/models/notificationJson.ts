import { z } from 'zod';
import { apiObject } from '#/core';
import { RestrictJsonSchema } from './restrictJson';
import { ToJsonSchema } from './toJson';

export const NotificationJsonSchema = apiObject({
  htmlBody: z.string().optional(),
  restrict: RestrictJsonSchema.optional(),
  subject: z.string().optional(),
  textBody: z.string().optional(),
  to: ToJsonSchema.optional(),
});

export type NotificationJson = z.infer<typeof NotificationJsonSchema>;
