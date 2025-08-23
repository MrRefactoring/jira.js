import { z } from 'zod';
import { EntityPropertySchema } from './entityProperty';

/** Details of a worklog. */
export const WorklogSchema = z.object({
  /** Details of the user who created the worklog. */
  author: z.unknown().optional(),
  /** A comment about the worklog. Optional when creating or updating a worklog. */
  comment: z.string().optional(),
  /** The datetime on which the worklog was created. */
  created: z.string().datetime().optional(),
  /** The ID of the worklog record. */
  id: z.string().optional(),
  /** The ID of the issue this worklog is for. */
  issueId: z.string().optional(),
  /** Details of properties for the worklog. Optional when creating or updating a worklog. */
  properties: z.array(EntityPropertySchema).optional(),
  /** The URL of the worklog item. */
  self: z.string().optional(),
  /**
   * The datetime on which the worklog effort was started. Required when creating a worklog. Optional when updating a
   * worklog.
   */
  started: z.string().datetime().optional(),
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
  timeSpentSeconds: z.number().int().optional(),
  /** Details of the user who last updated the worklog. */
  updateAuthor: z.unknown().optional(),
  /** The datetime on which the worklog was last updated. */
  updated: z.string().datetime().optional(),
  /** Details about any restrictions in the visibility of the worklog. Optional when creating or updating a worklog. */
  visibility: z.unknown().optional(),
});

export type Worklog = z.infer<typeof WorklogSchema>;
