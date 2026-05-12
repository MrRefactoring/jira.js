import { z } from 'zod';

export const DefaultWorkflowEditorResponseSchema = z.object({
  value: z.enum(['NEW', 'LEGACY']).optional(),
});

export type DefaultWorkflowEditorResponse = z.infer<typeof DefaultWorkflowEditorResponseSchema>;
