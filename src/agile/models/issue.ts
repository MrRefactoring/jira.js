import { z } from 'zod';
import { apiObject } from '#/core';
import { ChangelogSchema } from './changelog';
import { IncludedFieldsSchema } from './includedFields';
import { OperationsSchema } from './operations';
import { IssueTransitionSchema } from './issueTransition';
/** Details about an issue. */

export const IssueSchema = apiObject({
  /** A page of changelogs. */
  changelog: apiObject({
    /** The list of changelogs. */
    histories: z.array(ChangelogSchema).optional(),
    /** The maximum number of results that could be on the page. */
    maxResults: z.number().optional(),
    /** The index of the first item returned on the page. */
    startAt: z.number().optional(),
    /** The number of results on the page. */
    total: z.number().optional(),
  }).optional(),
  /** A list of editable field details. */
  editmeta: apiObject({
    fields: z.record(z.string(), z.any()).optional(),
  }).optional(),
  /** Expand options that include additional issue details in the response. */
  expand: z.string().optional(),
  fields: z.record(z.string(), z.any()).optional(),
  fieldsToInclude: IncludedFieldsSchema.optional(),
  /** The ID of the issue. */
  id: z.string(),
  /** The key of the issue. */
  key: z.string(),
  /** The ID and name of each field present on the issue. */
  names: z.record(z.string(), z.any()).optional(),
  operations: OperationsSchema.optional(),
  /** Details of the issue properties identified in the request. */
  properties: z.record(z.string(), z.any()).optional(),
  /** The rendered value of each field present on the issue. */
  renderedFields: z.record(z.string(), z.any()).optional(),
  /** The schema describing each field present on the issue. */
  schema: z.record(z.string(), z.any()).optional(),
  /** The URL of the issue details. */
  self: z.url(),
  /** The transitions that can be performed on the issue. */
  transitions: z.array(IssueTransitionSchema).optional(),
  /** The versions of each field on the issue. */
  versionedRepresentations: z.record(z.string(), z.any()).optional(),
});

export type Issue = z.infer<typeof IssueSchema>;
