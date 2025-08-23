import { z } from 'zod';

/** The payload for creating a scope. Defines if a project is team-managed project or company-managed project */
export const ScopePayloadSchema = z.object({
  /** The type of the scope. Use `GLOBAL` or empty for company-managed project, and `PROJECT` for team-managed project */
  type: z.enum(['GLOBAL', 'PROJECT']).optional(),
});

export type ScopePayload = z.infer<typeof ScopePayloadSchema>;
