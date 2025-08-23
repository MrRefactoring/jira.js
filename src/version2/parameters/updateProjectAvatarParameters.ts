import { z } from 'zod';

export const UpdateProjectAvatarParametersSchema = z.object({
  /** The ID or (case-sensitive) key of the project. */
  projectIdOrKey: z.string(),
  /** The file name of the avatar icon. Returned for system avatars. */
  fileName: z.string().optional(),
  /** The ID of the avatar. */
  id: z.string(),
  /** Whether the avatar can be deleted. */
  isDeletable: z.boolean().optional(),
  /** Whether the avatar is used in Jira. For example, shown as a project's avatar. */
  isSelected: z.boolean().optional(),
  /** Whether the avatar is a system avatar. */
  isSystemAvatar: z.boolean().optional(),
  /**
   * The owner of the avatar. For a system avatar the owner is null (and nothing is returned). For non-system avatars
   * this is the appropriate identifier, such as the ID for a project or the account ID for a user.
   */
  owner: z.string().optional(),
  /** The list of avatar icon URLs. */
  urls: z.object({}).optional(),
});

export type UpdateProjectAvatarParameters = z.infer<typeof UpdateProjectAvatarParametersSchema>;
