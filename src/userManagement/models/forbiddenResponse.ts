import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/** You are not authorized to access this resource* */

export const ForbiddenResponseSchema = apiObject({
  key: openEnum(['forbidden']),
});

export type ForbiddenResponse = z.infer<typeof ForbiddenResponseSchema>;
