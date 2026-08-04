import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/** The payload for creating a scope. Defines if a project is team-managed project or company-managed project */

export const ScopePayloadSchema = apiObject({
  /** The type of the scope. Use `GLOBAL` or empty for company-managed project, and `PROJECT` for team-managed project */
  type: openEnum(['GLOBAL', 'PROJECT']).optional(),
});

export type ScopePayload = z.infer<typeof ScopePayloadSchema>;
