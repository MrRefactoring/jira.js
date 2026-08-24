import { z } from 'zod';
import { openEnum } from '#/core';
import { EntityPropertyDetailsSchema } from '../models';

export const UpdateEntityPropertiesValueSchema = z.object({
  /** The app migration transfer ID. */
  'Atlassian-Transfer-Id': z.string(),
  /** The type indicating the object that contains the entity properties. */
  entityType: openEnum([
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
  body: z.array(EntityPropertyDetailsSchema),
});

export type UpdateEntityPropertiesValue = z.input<typeof UpdateEntityPropertiesValueSchema>;
