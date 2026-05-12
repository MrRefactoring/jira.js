import { z } from 'zod';
import { PageOfChangelogsSchema } from '#/models/pageOfChangelogs';
import { IssueUpdateMetadataSchema } from '#/models/issueUpdateMetadata';
import { IncludedFieldsSchema } from '#/models/includedFields';
import { OperationsSchema } from '#/models/operations';
import { IssueTransitionSchema } from '#/models/issueTransition';

/** Details about an issue. */
export const IssueSchema = z.object({
  changelog: PageOfChangelogsSchema.optional(),
  editmeta: IssueUpdateMetadataSchema.optional(),
  /** Expand options that include additional issue details in the response. */
  expand: z.string().optional(),
  fields: z.record(z.string(), z.any()).optional(),
  fieldsToInclude: IncludedFieldsSchema.optional(),
  /** The ID of the issue. */
  id: z.string().optional(),
  /** The key of the issue. */
  key: z.string().optional(),
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
  self: z.url().optional(),
  /** The transitions that can be performed on the issue. */
  transitions: z.array(IssueTransitionSchema).optional(),
  /** The versions of each field on the issue. */
  versionedRepresentations: z.record(z.string(), z.any()).optional(),
});

export type Issue = z.infer<typeof IssueSchema>;
