import { z } from 'zod';

export const CreateIssueTypeParametersSchema = z.object({
  /** The description of the issue type. */
  description: z.string().optional(),
  /**
   * The hierarchy level of the issue type. Use:
   *
   * - `-1` for Subtask.
   * - `0` for Base.
   *
   * Defaults to `0`.
   */
  hierarchyLevel: z.number().int().optional(),
  /** The unique name for the issue type. The maximum length is 60 characters. */
  name: z.string(),
  /**
   * Deprecated. Use `hierarchyLevel` instead. See the [deprecation
   * notice](https://community.developer.atlassian.com/t/deprecation-of-the-epic-link-parent-link-and-other-related-fields-in-rest-apis-and-webhooks/54048)
   * for details.
   *
   * Whether the issue type is `subtype` or `standard`. Defaults to `standard`.
   */
  type: z.enum(['subtask', 'standard']).optional(),
});

export type CreateIssueTypeParameters = z.infer<typeof CreateIssueTypeParametersSchema>;
