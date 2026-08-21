import { z } from 'zod';
import { apiObject } from '#/core';
import { GroupJsonSchema } from './groupJson';
import { ProjectSchema } from './project';
import { ProjectRoleSchema } from './projectRole';
import { UserSchema } from './user';

export const FilterPermissionSchema = apiObject({
  edit: z.boolean().optional(),
  group: GroupJsonSchema.optional(),
  id: z.number().optional(),
  project: ProjectSchema.optional(),
  role: ProjectRoleSchema.optional(),
  type: z.string().optional(),
  user: UserSchema.optional(),
  view: z.boolean().optional(),
});

export type FilterPermission = z.infer<typeof FilterPermissionSchema>;
