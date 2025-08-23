import { z } from 'zod';
import { EntityPropertySchema } from './entityProperty';

export const AddWorklogParametersSchema = z.object({
  /** The ID or key the issue. */
  issueIdOrKey: z.string(),
  /** Whether users watching the issue are notified by email. */
  notifyUsers: z.boolean().optional(),
  /**
   * Defines how to update the issue's time estimate, the options are:
   *
   * - `new` Sets the estimate to a specific value, defined in `newEstimate`.
   * - `leave` Leaves the estimate unchanged.
   * - `manual` Reduces the estimate by amount specified in `reduceBy`.
   * - `auto` Reduces the estimate by the value of `timeSpent` in the worklog.
   */
  adjustEstimate: z.enum(['new', 'leave', 'manual', 'auto']).optional(),
  /**
   * The value to set as the issue's remaining time estimate, as days (#d), hours (#h), or minutes (#m or #). For
   * example, _2d_. Required when `adjustEstimate` is `new`.
   */
  newEstimate: z.string().optional(),
  /**
   * The amount to reduce the issue's remaining estimate by, as days (#d), hours (#h), or minutes (#m). For example,
   * _2d_. Required when `adjustEstimate` is `manual`.
   */
  reduceBy: z.string().optional(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information about work logs in the response. This parameter accepts `properties`, which returns worklog
   * properties.
   */
  expand: z.string().optional(),
  /**
   * Whether the worklog entry should be added to the issue even if the issue is not editable, because
   * jira.issue.editable set to false or missing. For example, the issue is closed. Connect and Forge app users with
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) can use this flag.
   */
  overrideEditableFlag: z.boolean().optional(),
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

export type AddWorklogParameters = z.infer<typeof AddWorklogParametersSchema>;
