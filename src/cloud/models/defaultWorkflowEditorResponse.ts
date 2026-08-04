import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const DefaultWorkflowEditorResponseSchema = apiObject({
  value: openEnum(['NEW', 'LEGACY']).optional(),
});

export type DefaultWorkflowEditorResponse = z.infer<typeof DefaultWorkflowEditorResponseSchema>;
