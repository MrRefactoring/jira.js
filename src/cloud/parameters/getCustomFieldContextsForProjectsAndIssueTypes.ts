import { z } from 'zod';
import { ProjectIssueTypeMappingsSchema } from '../models';

export const GetCustomFieldContextsForProjectsAndIssueTypesSchema = z
  .object({
    /** The ID of the custom field. */
    fieldId: z.string(),
    /** The index of the first item to return in a page of results (page offset). */
    startAt: z.number().optional(),
    /** The maximum number of items to return per page. */
    maxResults: z.number().optional(),
  })
  .extend(ProjectIssueTypeMappingsSchema.shape);

export type GetCustomFieldContextsForProjectsAndIssueTypes = z.input<
  typeof GetCustomFieldContextsForProjectsAndIssueTypesSchema
>;
