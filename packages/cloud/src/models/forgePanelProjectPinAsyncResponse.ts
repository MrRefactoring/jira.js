import { z } from 'zod';

export const ForgePanelProjectPinAsyncResponseSchema = z.object({
  taskId: z.string().optional(),
});

export type ForgePanelProjectPinAsyncResponse = z.infer<typeof ForgePanelProjectPinAsyncResponseSchema>;
