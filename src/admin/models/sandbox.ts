import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const SandboxSchema = apiObject({
  type: openEnum(['CHILD', 'NONE']).optional(),
});

export type Sandbox = z.infer<typeof SandboxSchema>;
