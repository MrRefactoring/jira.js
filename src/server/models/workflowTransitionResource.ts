import type { z } from 'zod';
import { apiObject } from '#/core';

export const WorkflowTransitionResourceSchema = apiObject({});

export type WorkflowTransitionResource = z.infer<typeof WorkflowTransitionResourceSchema>;
