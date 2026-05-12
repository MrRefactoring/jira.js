import { z } from 'zod';
import { WorklogSchema } from '../models';

export const AddWorklogSchema = z
  .object({
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
     * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#expansion) to include additional
     * information about work logs in the response. This parameter accepts `properties`, which returns worklog
     * properties.
     */
    expand: z
      .union([z.string(), z.array(z.string()), z.enum(['properties']), z.array(z.enum(['properties']))])
      .optional(),
    /**
     * Whether the worklog entry should be added to the issue even if the issue is not editable, because
     * jira.issue.editable set to false or missing. For example, the issue is closed. Connect and Forge app users with
     * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) can use this flag.
     */
    overrideEditableFlag: z.boolean().optional(),
  })
  .extend(WorklogSchema.shape);

export type AddWorklog = z.input<typeof AddWorklogSchema>;
