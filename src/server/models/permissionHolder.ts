import { z } from 'zod';
import { apiObject } from '#/core';
import { FieldSchema } from './field';
import { GroupJsonSchema } from './groupJson';
import { ProjectRoleSchema } from './projectRole';
import { UserJsonSchema } from './userJson';

export const PermissionHolderSchema = apiObject({
  expand: z.string().optional(),
  field: FieldSchema.optional(),
  group: GroupJsonSchema.optional(),
  parameter: z.string().optional(),
  projectRole: ProjectRoleSchema.optional(),
  type: z.string().optional(),
  user: UserJsonSchema.optional(),
});

export type PermissionHolder = z.infer<typeof PermissionHolderSchema>;
