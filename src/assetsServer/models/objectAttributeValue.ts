import { z } from 'zod';
import { apiObject } from '#/core';
import { AssetObjectSchema, type AssetObject, type AssetObjectInput } from './assetObject';
import { UserSchema, type User } from './user';
import { GroupSchema, type Group } from './group';
import { ConfluencePageSchema, type ConfluencePage } from './confluencePage';
import { VersionSchema, type Version } from './version';
import { ProjectSchema, type Project } from './project';
import { StatusTypeSchema, type StatusType } from './statusType';

export interface ObjectAttributeValue {
  referencedObject?: AssetObject;
  user?: User;
  group?: Group;
  confluencePage?: ConfluencePage;
  version?: Version;
  project?: Project;
  status?: StatusType;
  value?: string;
  additionalValue?: string;
  searchValue?: string;
  referencedType?: boolean;
  displayValue?: string;
  [key: string]: unknown;
}

export interface ObjectAttributeValueInput {
  referencedObject?: AssetObjectInput;
  user?: z.input<typeof UserSchema>;
  group?: z.input<typeof GroupSchema>;
  confluencePage?: z.input<typeof ConfluencePageSchema>;
  version?: z.input<typeof VersionSchema>;
  project?: z.input<typeof ProjectSchema>;
  status?: z.input<typeof StatusTypeSchema>;
  value?: string;
  additionalValue?: string;
  searchValue?: string;
  referencedType?: boolean;
  displayValue?: string;
}

export const ObjectAttributeValueSchema = apiObject({
  referencedObject: (
    z.lazy((): z.ZodType<AssetObject, AssetObjectInput> => AssetObjectSchema) as z.ZodType<
      AssetObject,
      AssetObjectInput
    >
  ).optional(),
  user: UserSchema.optional(),
  group: GroupSchema.optional(),
  confluencePage: ConfluencePageSchema.optional(),
  version: VersionSchema.optional(),
  project: ProjectSchema.optional(),
  status: StatusTypeSchema.optional(),
  value: z.string().optional(),
  additionalValue: z.string().optional(),
  searchValue: z.string().optional(),
  referencedType: z.boolean().optional(),
  displayValue: z.string().optional(),
}) satisfies z.ZodType<ObjectAttributeValue, ObjectAttributeValueInput>;
