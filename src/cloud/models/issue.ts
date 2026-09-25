import { z } from 'zod';
import { apiObject } from '#/core';
import { PageOfChangelogsSchema, type PageOfChangelogs } from './pageOfChangelogs';
import { IssueUpdateMetadataSchema, type IssueUpdateMetadata } from './issueUpdateMetadata';
import { IssueFieldsSchema, type IssueFields, type IssueFieldsInput } from './issueFields';
import { IncludedFieldsSchema, type IncludedFields } from './includedFields';
import { OperationsSchema, type Operations } from './operations';
import { JsonTypeSchema, type JsonType } from './jsonType';
import { IssueTransitionSchema, type IssueTransition } from './issueTransition';

export interface Issue {
  changelog?: PageOfChangelogs;
  editmeta?: IssueUpdateMetadata;
  /** Expand options that include additional issue details in the response. */
  expand?: string;
  fields?: IssueFields;
  fieldsToInclude?: IncludedFields;
  /** The ID of the issue. */
  id?: string;
  /** The key of the issue. */
  key?: string;
  /** The ID and name of each field present on the issue. */
  names?: Record<string, string>;
  operations?: Operations;
  /** Details of the issue properties identified in the request. */
  properties?: Record<string, unknown>;
  /** The rendered value of each field present on the issue. */
  renderedFields?: Record<string, unknown>;
  /** The schema describing each field present on the issue. */
  schema?: Record<string, JsonType>;
  /** The URL of the issue details. */
  self?: string;
  /** The transitions that can be performed on the issue. */
  transitions?: IssueTransition[];
  /** The versions of each field on the issue. */
  versionedRepresentations?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface IssueInput {
  changelog?: z.input<typeof PageOfChangelogsSchema>;
  editmeta?: z.input<typeof IssueUpdateMetadataSchema>;
  /** Expand options that include additional issue details in the response. */
  expand?: string;
  fields?: IssueFieldsInput;
  fieldsToInclude?: z.input<typeof IncludedFieldsSchema>;
  /** The ID of the issue. */
  id?: string;
  /** The key of the issue. */
  key?: string;
  /** The ID and name of each field present on the issue. */
  names?: Record<string, string>;
  operations?: z.input<typeof OperationsSchema>;
  /** Details of the issue properties identified in the request. */
  properties?: Record<string, unknown>;
  /** The rendered value of each field present on the issue. */
  renderedFields?: Record<string, unknown>;
  /** The schema describing each field present on the issue. */
  schema?: Record<string, z.input<typeof JsonTypeSchema>>;
  /** The URL of the issue details. */
  self?: string;
  /** The transitions that can be performed on the issue. */
  transitions?: z.input<typeof IssueTransitionSchema>[];
  /** The versions of each field on the issue. */
  versionedRepresentations?: Record<string, unknown>;
}

/** Details about an issue. */
export const IssueSchema = apiObject({
  changelog: PageOfChangelogsSchema.optional(),
  editmeta: IssueUpdateMetadataSchema.optional(),
  /** Expand options that include additional issue details in the response. */
  expand: z.string().optional(),
  fields: (
    z.lazy((): z.ZodType<IssueFields, IssueFieldsInput> => IssueFieldsSchema) as z.ZodType<
      IssueFields,
      IssueFieldsInput
    >
  ).optional(),
  fieldsToInclude: IncludedFieldsSchema.optional(),
  /** The ID of the issue. */
  id: z.string().optional(),
  /** The key of the issue. */
  key: z.string().optional(),
  /** The ID and name of each field present on the issue. */
  names: z.record(z.string(), z.string()).optional(),
  operations: OperationsSchema.optional(),
  /** Details of the issue properties identified in the request. */
  properties: z.record(z.string(), z.any()).optional(),
  /** The rendered value of each field present on the issue. */
  renderedFields: z.record(z.string(), z.any()).optional(),
  /** The schema describing each field present on the issue. */
  schema: z.record(z.string(), JsonTypeSchema).optional(),
  /** The URL of the issue details. */
  self: z.url().optional(),
  /** The transitions that can be performed on the issue. */
  transitions: z.array(IssueTransitionSchema).optional(),
  /** The versions of each field on the issue. */
  versionedRepresentations: z.record(z.string(), z.any()).optional(),
}) satisfies z.ZodType<Issue, IssueInput>;
