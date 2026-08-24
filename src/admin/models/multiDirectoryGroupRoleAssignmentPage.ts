import { z } from 'zod';
import { apiObject } from '#/core';
import { MultiDirectoryGroupRoleAssignmentSchema } from './multiDirectoryGroupRoleAssignment';
import { LinkPageCursorSchema } from './linkPageCursor';

export const MultiDirectoryGroupRoleAssignmentPageSchema = apiObject({
  /** A page of group role assignments. */
  data: z.array(MultiDirectoryGroupRoleAssignmentSchema).optional(),
  links: LinkPageCursorSchema.optional(),
});

export type MultiDirectoryGroupRoleAssignmentPage = z.infer<typeof MultiDirectoryGroupRoleAssignmentPageSchema>;
