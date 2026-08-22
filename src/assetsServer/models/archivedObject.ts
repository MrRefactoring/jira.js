import { z } from 'zod';
import { apiObject } from '#/core';
import { AvatarSchema } from './avatar';
import { ObjectTypeSchema } from './objectType';
import { ObjectSchemaSchema } from './objectSchema';
import { UserSchema } from './user';
/** An object that has been archived, as the archive listing describes it. */

export const ArchivedObjectSchema = apiObject({
  id: z.number(),
  key: z.string(),
  label: z.string(),
  hasAvatar: z.boolean().optional(),
  avatar: AvatarSchema.optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  objectType: ObjectTypeSchema.optional(),
  objectSchema: ObjectSchemaSchema.optional(),
  archived: z.boolean(),
  archivedDate: z.string().optional(),
  archivedBy: UserSchema.optional(),
});

export type ArchivedObject = z.infer<typeof ArchivedObjectSchema>;
