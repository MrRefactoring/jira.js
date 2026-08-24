import { z } from 'zod';
import { apiObject } from '#/core';

export const EmailTemplateTypesSchema = apiObject({
  userEmailAddress: z.string().optional(),
  emailTypes: z
    .array(
      apiObject({
        id: z.number().optional(),
        eventName: z.string().optional(),
        templateName: z.string().optional(),
        html: z.boolean().optional(),
        text: z.boolean().optional(),
        batchedNotification: z.boolean().optional(),
        active: z.boolean().optional(),
      }),
    )
    .optional(),
});

export type EmailTemplateTypes = z.infer<typeof EmailTemplateTypesSchema>;
