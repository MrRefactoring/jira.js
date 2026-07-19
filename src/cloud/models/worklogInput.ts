import { z } from 'zod';
import { apiObject } from '#/core';
import { UserDetailsSchema } from './userDetails';
import { DocumentSchema } from './document';
import { EntityPropertySchema } from './entityProperty';
import { VisibilitySchema } from './visibility';
/** Details of a worklog. */

export const WorklogInputSchema = apiObject({
  author: UserDetailsSchema.optional(),
  /**
   * A document in Atlassian Document Format, or a string of wiki markup — a string is sent to the v2 endpoint that
   * parses it, and the result is read back as a document.
   */
  comment: z.union([DocumentSchema, z.string()]).optional(),
  /** The datetime on which the worklog was created. */
  created: z.coerce.date().optional(),
  /** The ID of the worklog record. */
  id: z.string().optional(),
  /** The ID of the issue this worklog is for. */
  issueId: z.string().optional(),
  /** Details of properties for the worklog. Optional when creating or updating a worklog. */
  properties: z.array(EntityPropertySchema).optional(),
  /** The URL of the worklog item. */
  self: z.string().url().optional(),
  /**
   * The datetime on which the worklog effort was started. Required when creating a worklog. Optional when updating a
   * worklog.
   */
  started: z.coerce.date().optional(),
  /**
   * The time spent working on the issue as days (#d), hours (#h), or minutes (#m or #). Required when creating a
   * worklog if `timeSpentSeconds` isn't provided. Optional when updating a worklog. Cannot be provided if
   * `timeSpentSecond` is provided.
   */
  timeSpent: z.string().optional(),
  /**
   * The time in seconds spent working on the issue. Required when creating a worklog if `timeSpent` isn't provided.
   * Optional when updating a worklog. Cannot be provided if `timeSpent` is provided.
   */
  timeSpentSeconds: z.number().optional(),
  updateAuthor: UserDetailsSchema.optional(),
  /** The datetime on which the worklog was last updated. */
  updated: z.coerce.date().optional(),
  visibility: VisibilitySchema.optional(),
});

export type WorklogInput = z.infer<typeof WorklogInputSchema>;
