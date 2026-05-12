import { z } from 'zod';
import { WorklogSchema } from '../models';

export const UpdateWorklogSchema = z
  .object({
    /** The ID or key the issue. */
    issueIdOrKey: z.string(),
    /** The ID of the worklog. */
    id: z.string(),
    /** Whether users watching the issue are notified by email. */
    notifyUsers: z.boolean().optional(),
    /**
     * Defines how to update the issue's time estimate, the options are:
     *
     * - `new` Sets the estimate to a specific value, defined in `newEstimate`.
     * - `leave` Leaves the estimate unchanged.
     * - `auto` Updates the estimate by the difference between the original and updated value of `timeSpent` or
     *   `timeSpentSeconds`.
     */
    adjustEstimate: z.enum(['new', 'leave', 'manual', 'auto']).optional(),
    /**
     * The value to set as the issue's remaining time estimate, as days (#d), hours (#h), or minutes (#m or #). For
     * example, _2d_. Required when `adjustEstimate` is `new`.
     */
    newEstimate: z.string().optional(),
    /**
     * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#expansion) to include additional
     * information about worklogs in the response. This parameter accepts `properties`, which returns worklog
     * properties.
     */
    expand: z
      .union([z.string(), z.array(z.string()), z.enum(['properties']), z.array(z.enum(['properties']))])
      .optional(),
    /**
     * Whether the worklog should be added to the issue even if the issue is not editable. For example, because the
     * issue is closed. Connect and Forge app users with _Administer Jira_ [global
     * permission](https://confluence.atlassian.com/x/x4dKLg) can use this flag.
     */
    overrideEditableFlag: z.boolean().optional(),
  })
  .extend(WorklogSchema.shape);

export type UpdateWorklog = z.input<typeof UpdateWorklogSchema>;
