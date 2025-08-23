import { z } from 'zod';

/** Issue security level member. */
export const IssueSecurityLevelMemberSchema = z.object({
  /**
   * The user or group being granted the permission. It consists of a `type` and a type-dependent `parameter`. See
   * [Holder object](../api-group-permission-schemes/#holder-object) in _Get all permission schemes_ for more
   * information.
   */
  holder: z.unknown(),
  /** The ID of the issue security level member. */
  id: z.number().int(),
  /** The ID of the issue security level. */
  issueSecurityLevelId: z.number().int(),
});

export type IssueSecurityLevelMember = z.infer<typeof IssueSecurityLevelMemberSchema>;
