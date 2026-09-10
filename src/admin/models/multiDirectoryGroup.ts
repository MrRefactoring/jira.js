import { z } from 'zod';
import { apiObject } from '#/core';
import { ManagementAccessSchema } from './managementAccess';
import { GroupCountsSchema } from './groupCounts';
import { LinkSelfCursorSchema } from './linkSelfCursor';

export const MultiDirectoryGroupSchema = apiObject({
  /** Unique ID of the group. */
  id: z.string().optional(),
  /** The group name. */
  name: z.string().optional(),
  /** The group description. */
  description: z.string().optional(),
  /** The ID of the directory. */
  directoryId: z.string().optional(),
  managementAccess: ManagementAccessSchema.optional(),
  /** Indication if group was created via IdP Sync. */
  externalSynced: z.boolean().optional(),
  /** Specifies how the group is managed: external, admins, team-members, or open. */
  managedBy: z.string().optional(),
  counts: GroupCountsSchema.optional(),
  links: LinkSelfCursorSchema.optional(),
});

export type MultiDirectoryGroup = z.infer<typeof MultiDirectoryGroupSchema>;
