import { z } from 'zod';
import { openEnum } from '#/core';

export const GetIssueSchema = z.object({
  /**
   * The expand param is used to include, hidden by default, parts of response. This can be used to include:
   * renderedFields, names, schema, transitions, operations, editmeta, changelog, versionedRepresentations. This
   * parameter accepts a comma-separated list.
   */
  expand: z
    .union([
      openEnum([
        'renderedFields',
        'names',
        'schema',
        'transitions',
        'operations',
        'editmeta',
        'changelog',
        'versionedRepresentations',
      ]),
      z.array(
        openEnum([
          'renderedFields',
          'names',
          'schema',
          'transitions',
          'operations',
          'editmeta',
          'changelog',
          'versionedRepresentations',
        ]),
      ),
    ])
    .optional(),
  /** Issue id or key */
  issueIdOrKey: z.string(),
  /** The list of fields to return for the issue. By default, all fields are returned. */
  fields: z.array(z.string()).optional(),
  /** The updateHistory param adds the issues retrieved by this method to the current user's issue history */
  updateHistory: z.boolean().optional(),
  /** The list of properties to return for the issue. By default no properties are returned. */
  properties: z.array(z.string()).optional(),
});

export type GetIssue = z.input<typeof GetIssueSchema>;
