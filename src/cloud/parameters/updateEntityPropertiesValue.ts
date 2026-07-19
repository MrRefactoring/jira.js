import { z } from 'zod';

export const UpdateEntityPropertiesValueSchema = z.object({
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
  body: z.record(z.string(), z.any()),
});

export type UpdateEntityPropertiesValue = z.input<typeof UpdateEntityPropertiesValueSchema>;
