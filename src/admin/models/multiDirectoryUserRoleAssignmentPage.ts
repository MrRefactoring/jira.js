import { z } from 'zod';
import { apiObject } from '#/core';
import { MultiDirectoryUserRoleAssignmentSchema } from './multiDirectoryUserRoleAssignment';
import { LinkPageCursorSchema } from './linkPageCursor';

export const MultiDirectoryUserRoleAssignmentPageSchema = apiObject({
  /** A page of user role assignments. */
  data: z.array(MultiDirectoryUserRoleAssignmentSchema).optional(),
  links: LinkPageCursorSchema.optional(),
});

export type MultiDirectoryUserRoleAssignmentPage = z.infer<typeof MultiDirectoryUserRoleAssignmentPageSchema>;
