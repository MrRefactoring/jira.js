import { z } from 'zod';

export const UpdateEntityPropertiesValueParametersSchema = z.object({
  /** The app migration transfer ID. */
  'Atlassian-Transfer-Id': z.string(),
  /** The type indicating the object that contains the entity properties. */
  entityType: z.enum([
    'IssueProperty',
    'CommentProperty',
    'DashboardItemProperty',
    'IssueTypeProperty',
    'ProjectProperty',
    'UserProperty',
    'WorklogProperty',
    'BoardProperty',
    'SprintProperty',
  ]),
});

export type UpdateEntityPropertiesValueParameters = z.infer<typeof UpdateEntityPropertiesValueParametersSchema>;
