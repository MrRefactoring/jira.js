import { z } from 'zod';
import { apiObject } from '#/core';

export const ForgePanelProjectPinAsyncResponseSchema = apiObject({
  taskId: z.string().optional(),
});

export type ForgePanelProjectPinAsyncResponse = z.infer<typeof ForgePanelProjectPinAsyncResponseSchema>;
