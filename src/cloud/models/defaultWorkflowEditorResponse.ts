import { z } from 'zod';
import { apiObject } from '#/core';

export const DefaultWorkflowEditorResponseSchema = apiObject({
  value: z.enum(['NEW', 'LEGACY']).optional(),
});

export type DefaultWorkflowEditorResponse = z.infer<typeof DefaultWorkflowEditorResponseSchema>;
