import { z } from 'zod';
import { apiObject } from '#/core';
import { AvatarSchema, type Avatar } from './avatar';
import { ObjectTypeSchema, type ObjectType } from './objectType';
import { UserSchema, type User } from './user';
import { ObjectAttributeSchema, type ObjectAttribute } from './objectAttribute';
import { AssetObjectExtendedSchema, type AssetObjectExtended } from './assetObjectExtended';
import { LinkSchema, type Link } from './link';

export interface AssetObject {
  id?: number;
  label?: string;
  objectKey?: string;
  avatar?: Avatar;
  objectType?: ObjectType;
  archivedDate?: Date;
  archivedBy?: User;
  created?: Date;
  updated?: Date;
  hasAvatar?: boolean;
  timestamp?: number;
  attributes?: ObjectAttribute[];
  extendedInfo?: AssetObjectExtended;
  get_links?: Link;
  archived?: boolean;
  name?: string;
}

export const AssetObjectSchema: z.ZodType<AssetObject> = apiObject({
  id: z.number().optional(),
  label: z.string().optional(),
  objectKey: z.string().optional(),
  avatar: AvatarSchema.optional(),
  objectType: ObjectTypeSchema.optional(),
  archivedDate: z.coerce.date().optional(),
  archivedBy: UserSchema.optional(),
  created: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  hasAvatar: z.boolean().optional(),
  timestamp: z.number().optional(),
  attributes: z.array(z.lazy(() => ObjectAttributeSchema)).optional(),
  extendedInfo: AssetObjectExtendedSchema.optional(),
  get_links: LinkSchema.optional(),
  archived: z.boolean().optional(),
  name: z.string().optional(),
});
