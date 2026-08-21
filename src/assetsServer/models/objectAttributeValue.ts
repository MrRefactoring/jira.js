import { z } from 'zod';
import { apiObject } from '#/core';
import { AssetObjectSchema, type AssetObject } from './assetObject';
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
  value?: Record<string, unknown>;
  additionalValue?: string;
  displayValue?: Record<string, unknown>;
  searchValue?: Record<string, unknown>;
  referencedType?: boolean;
}

export const ObjectAttributeValueSchema: z.ZodType<ObjectAttributeValue> = apiObject({
  referencedObject: z.lazy(() => AssetObjectSchema).optional(),
  user: UserSchema.optional(),
  group: GroupSchema.optional(),
  confluencePage: ConfluencePageSchema.optional(),
  version: VersionSchema.optional(),
  project: ProjectSchema.optional(),
  status: StatusTypeSchema.optional(),
  value: z.record(z.string(), z.any()).optional(),
  additionalValue: z.string().optional(),
  displayValue: z.record(z.string(), z.any()).optional(),
  searchValue: z.record(z.string(), z.any()).optional(),
  referencedType: z.boolean().optional(),
});
