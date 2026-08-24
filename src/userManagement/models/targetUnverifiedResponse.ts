import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/** Cannot manage an unverified target account* */

export const TargetUnverifiedResponseSchema = apiObject({
  key: openEnum(['forbidden.targetUnverified']),
});

export type TargetUnverifiedResponse = z.infer<typeof TargetUnverifiedResponseSchema>;
