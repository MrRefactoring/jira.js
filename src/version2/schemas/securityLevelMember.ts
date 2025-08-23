import { z } from 'zod';

/** Issue security level member. */
export const SecurityLevelMemberSchema = z.object({
  /**
   * The user or group being granted the permission. It consists of a `type` and a type-dependent `parameter`. See
   * [Holder object](../api-group-permission-schemes/#holder-object) in _Get all permission schemes_ for more
   * information.
   */
  holder: z.unknown(),
  /** The ID of the issue security level member. */
  id: z.string(),
  /** The ID of the issue security level. */
  issueSecurityLevelId: z.string(),
  /** The ID of the issue security scheme. */
  issueSecuritySchemeId: z.string(),
  managed: z.boolean().optional(),
});

export type SecurityLevelMember = z.infer<typeof SecurityLevelMemberSchema>;
