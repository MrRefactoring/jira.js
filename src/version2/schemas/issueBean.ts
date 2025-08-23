import { z } from 'zod';
import { IncludedFieldsSchema } from './includedFields';
import { IssueTransitionSchema } from './issueTransition';

/** Details about an issue. */
export const IssueBeanSchema = z.object({
  /** Details of changelogs associated with the issue. */
  changelog: z.unknown().optional(),
  /** The metadata for the fields on the issue that can be amended. */
  editmeta: z.unknown().optional(),
  /** Expand options that include additional issue details in the response. */
  expand: z.string().optional(),
  fields: z.object({}).optional(),
  fieldsToInclude: IncludedFieldsSchema.optional(),
  /** The ID of the issue. */
  id: z.string().optional(),
  /** The key of the issue. */
  key: z.string().optional(),
  /** The ID and name of each field present on the issue. */
  names: z.object({}).optional(),
  /** The operations that can be performed on the issue. */
  operations: z.unknown().optional(),
  /** Details of the issue properties identified in the request. */
  properties: z.object({}).optional(),
  /** The rendered value of each field present on the issue. */
  renderedFields: z.object({}).optional(),
  /** The schema describing each field present on the issue. */
  schema: z.object({}).optional(),
  /** The URL of the issue details. */
  self: z.string().optional(),
  /** The transitions that can be performed on the issue. */
  transitions: z.array(IssueTransitionSchema).optional(),
  /** The versions of each field on the issue. */
  versionedRepresentations: z.object({}).optional(),
});

export type IssueBean = z.infer<typeof IssueBeanSchema>;
