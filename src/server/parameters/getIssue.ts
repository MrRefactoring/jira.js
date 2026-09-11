import { z } from 'zod';

export const GetIssueSchema = z.object({
  /**
   * The expand param is used to include, hidden by default, parts of response. This can be used to include:
   * renderedFields, names, schema, transitions, operations, editmeta, changelog, versionedRepresentations.
   */
  expand: z.string().optional(),
  /** Issue id or key */
  issueIdOrKey: z.string(),
  /** The list of fields to return for the issue. By default, all fields are returned. */
  fields: z.string().optional(),
  /** The updateHistory param adds the issues retrieved by this method to the current user's issue history */
  updateHistory: z.string().optional(),
  /** The list of properties to return for the issue. By default no properties are returned. */
  properties: z.string().optional(),
});

export type GetIssue = z.input<typeof GetIssueSchema>;
