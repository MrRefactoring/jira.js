import { z } from 'zod';
import { apiObject } from '#/core';
import { AvatarSchema, type Avatar } from './avatar';
import { ObjectTypeSchema, type ObjectType } from './objectType';
import { UserSchema, type User } from './user';
import { ObjectAttributeSchema, type ObjectAttribute, type ObjectAttributeInput } from './objectAttribute';
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
  [key: string]: unknown;
}

export interface AssetObjectInput {
  id?: number;
  label?: string;
  objectKey?: string;
  avatar?: z.input<typeof AvatarSchema>;
  objectType?: z.input<typeof ObjectTypeSchema>;
  archivedDate?: unknown;
  archivedBy?: z.input<typeof UserSchema>;
  created?: unknown;
  updated?: unknown;
  hasAvatar?: boolean;
  timestamp?: number;
  attributes?: ObjectAttributeInput[];
  extendedInfo?: z.input<typeof AssetObjectExtendedSchema>;
  get_links?: z.input<typeof LinkSchema>;
  archived?: boolean;
  name?: string;
}

export const AssetObjectSchema = apiObject({
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
  attributes: z
    .array(
      z.lazy((): z.ZodType<ObjectAttribute, ObjectAttributeInput> => ObjectAttributeSchema) as z.ZodType<
        ObjectAttribute,
        ObjectAttributeInput
      >,
    )
    .optional(),
  extendedInfo: AssetObjectExtendedSchema.optional(),
  get_links: LinkSchema.optional(),
  archived: z.boolean().optional(),
  name: z.string().optional(),
}) satisfies z.ZodType<AssetObject, AssetObjectInput>;
