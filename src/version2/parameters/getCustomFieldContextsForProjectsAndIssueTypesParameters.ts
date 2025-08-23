import { z } from 'zod';
import { ProjectIssueTypeMappingSchema } from './projectIssueTypeMapping';

export const GetCustomFieldContextsForProjectsAndIssueTypesParametersSchema = z.object({
  /** The ID of the custom field. */
  fieldId: z.string(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
  /** The project and issue type mappings. */
  mappings: z.array(ProjectIssueTypeMappingSchema),
});

export type GetCustomFieldContextsForProjectsAndIssueTypesParameters = z.infer<
  typeof GetCustomFieldContextsForProjectsAndIssueTypesParametersSchema
>;
