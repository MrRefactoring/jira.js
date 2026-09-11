import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const DefaultShareScopeSchema = apiObject({
  scope: openEnum(['GLOBAL', 'AUTHENTICATED', 'PRIVATE']).optional(),
});

export type DefaultShareScope = z.infer<typeof DefaultShareScopeSchema>;
